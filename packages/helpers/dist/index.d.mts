declare const global: {
    baseURL: string;
};
declare const getTimestamp: () => number;
type extensionInstallEvent = (options?: any) => void;
interface Extension {
    install: extensionInstallEvent;
    afterEvent?: Function;
}
declare function reportData(url: string, data: Record<string, any>): void;

export { type Extension, type extensionInstallEvent, getTimestamp, global, reportData };
