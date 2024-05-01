import { Extension } from '@imrobot/monitor-helpers';
import { Plugin } from 'vue';

type Use = <T extends Extension>(
  extension: T,
  options?: Parameters<T["install"]>[0]
) => void;

type Monitor = {
  use: Use;
} & Plugin;

declare const monitor: Monitor;

export { monitor as default };
