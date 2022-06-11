import { createRoot } from "react-dom/client";
import App from "./App";

const htmlRootElement = document.querySelector("#app")!;

const app = createRoot(htmlRootElement);

app.render(<App />);
