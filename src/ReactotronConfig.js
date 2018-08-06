import Reactotron, {
  trackGlobalErrors,
  openInEditor,
  overlay,
  asyncStorage,
  networking
} from 'reactotron-react-native'
Reactotron
  .configure({
    host: '192.168.1.18'
  }) // controls connection & communication settings
  .use(trackGlobalErrors())
  .use(openInEditor())
  .use(overlay())
  .use(asyncStorage())
  .use(networking())
  .connect()