import rrwebPlayer, { type RRwebPlayerOptions } from "rrweb-player";

export default () => {
  const visible = ref(false);

  const target = ref<HTMLElement>();

  const playScreen = async (events: RRwebPlayerOptions["props"]["events"]) => {
    visible.value = true;
    await nextTick();
    new rrwebPlayer({
      target: target.value!,
      props: {
        events,
        UNSAFE_replayCanvas: true,
      },
    });
  };

  return {
    playScreen,
    target,
    visible,
  };
};
