import { GlobalProvider } from "./contexts";
import { SharedNavigation } from "./routes";

export const Stories = () => (
  <GlobalProvider>
    <SharedNavigation />
  </GlobalProvider>
)