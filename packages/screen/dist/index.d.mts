import { Extension } from '@imrobot/monitor-helpers';

/**
 * https://github.com/rrweb-io/rrweb/tree/master/packages/rrweb-player/#installation
 */

declare const playScreen: (el: HTMLElement, b64Data: string, width?: number) => void;

declare const extension: Extension;

export { extension as default, playScreen };
