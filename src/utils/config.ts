export const OPTIONS = ["tbg-access-token", "tbg-user-data"] as const;

export const DEFAULT_CONFIG: Config = {
  "tbg-user-data": null,
  "tbg-access-token": "",
};

export type StorageKeys = (typeof OPTIONS)[number];
export type Config = Record<StorageKeys, any>;

export default (): Promise<Config> =>
  new Promise((resolve, reject) =>
    chrome?.storage?.local?.get(OPTIONS, result => {
      const config = Object.keys(DEFAULT_CONFIG).reduce((a, c) => {
        return {
          ...a,
          // @ts-ignore
          [c]: result?.[c] || DEFAULT_CONFIG[c],
        };
      }, {});

      resolve(config as Config);
    })
  );
