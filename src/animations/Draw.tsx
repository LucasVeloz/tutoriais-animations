import { FontAwesome } from "@expo/vector-icons";
import { Canvas, useTouchHandler, Skia, SkPath, useDrawCallback, SkCanvas, Path, SkiaView, PaintStyle, Rect, SkPaint, useCanvasRef } from "@shopify/react-native-skia"
import { documentDirectory, writeAsStringAsync } from "expo-file-system";
import * as Sharing from "expo-sharing";
import { useEffect, useRef, useState } from "react"
import { ActivityIndicator, Button, StyleSheet, TouchableOpacity, View } from "react-native"
import { io } from "socket.io-client";

interface ICurrentPath {
  path: SkPath;
  color: string;
}

const COLORS = ['#000', '#FF0066', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'grey']

const paint = (color?: string) => {
  const paint = Skia.Paint();
  paint.setStyle(PaintStyle.Stroke)
  paint.setStrokeWidth(4)
  paint.setColor(Skia.Color(color || "#FF0066"))
  return paint;
}

const socket = io("https://chat-teste-123.herokuapp.com");
const name = `teste ${Math.random() * 100}`;

export const Draw = () => {
  const ref = useCanvasRef();
  const ref2 = useCanvasRef();
  const canvasRef = useRef<SkCanvas>()
  const [paths, setPaths] = useState<ICurrentPath[]>([]);
  const currentPath = useRef<ICurrentPath | null>(null);
  const [currentColor, setCurrentColor] = useState(COLORS[0]);
  const [isLoading, setIsLoading] = useState(false);

  const changeColor = (color: string) => {
    setCurrentColor(color)
  }


  const clearCanvas = () => {
    socket.emit('message', {
      name,
      room: 'draw',
      message: {
        clear: true,
      }
    })
  }

  const saveCanvas = async () => {
    setIsLoading(true);
    const image = ref.current?.makeImageSnapshot();
    const bytes = image?.encodeToBase64();
    const filepath = `${documentDirectory}/desenho.png`;
    await writeAsStringAsync(filepath, bytes || '', { encoding: "base64" });
    await Sharing.shareAsync(filepath)
    setIsLoading(false);
  }

  const onTouch = useTouchHandler({
    onStart: ({ x, y }) => {
      currentPath.current = {
        path: Skia.Path.Make(),
        color: currentColor,
      };
      currentPath.current.path.moveTo(x, y)

    },
    onActive: ({ x, y }) => {
      if (!currentPath.current) return;
      currentPath.current.path?.lineTo(x, y)
      canvasRef.current?.drawPath(currentPath.current.path, paint(currentPath.current.color))

    },
    onEnd: () => {
      socket.emit('message', {
        name,
        room: 'draw',
        message: {
          path: currentPath.current?.path?.toSVGString(),
          color: currentColor
        }
      })
      currentPath.current = null
    }
  }, [currentColor]);

  const onDraw = useDrawCallback((canvas, info) => {
    onTouch(info.touches);
    canvasRef.current = canvas;
  }, [currentColor])

  useEffect(() => {
    socket.emit('selectRoom', {
      name,
      role: 'STUDENT',
      room: 'draw'
    })
    
  }, [])

  useEffect(() => {
    socket.on('chat', (data) => {
      if(!!data.message?.clear) {
        setPaths([])
        ref2.current?.redraw()
        return;
      }
      setPaths(value => value.concat(data.message))
    })
  }, [])

  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas} ref={ref}>
      {paths.map((item, index) => (
        <Path path={item.path} 
        key={index}
        paint={{
          current: paint(item.color)
        }}
        />
        ))}
      </Canvas>
      <SkiaView ref={ref2} onDraw={onDraw} style={styles.container} />
      <View>
        <View style={styles.buttons}>
          <View>
            <Button title="Salvar" onPress={saveCanvas} />
            {isLoading && <ActivityIndicator />}
          </View>
          <Button title="Limpar" onPress={clearCanvas} />
        </View>
        <View style={styles.colorContainer}>
          {COLORS.map((color, index) => (
            <TouchableOpacity key={index} onPressIn={() => changeColor(color)}>
              <FontAwesome
                name="pencil" 
                size={50} 
                color={color}
                style={{
                  transform: [{
                    scale: currentColor === color ? 1.5 : 1
                  }]
                }}
                />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  canvas: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  colorContainer: {
    width: '100%',
    height: 150,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    flexWrap: 'wrap'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})