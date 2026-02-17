import { defineConfig, type Plugin, type ResolvedConfig } from "vite";
import { AssetPack, type AssetPackConfig } from "@assetpack/core";
import { pixiPipes } from "@assetpack/core/pixi";
import { compress } from "@assetpack/core/image";
import { spineAtlasCompress } from "@assetpack/core/spine";
import { mipmap } from "@assetpack/core/image";
import { spineAtlasMipmap } from "@assetpack/core/spine";
import { pixiManifest } from "@assetpack/core/manifest";
import { spineAtlasManifestMod } from "@assetpack/core/spine";
import { webfont } from "@assetpack/core/webfont";

function assetpackPlugin(): Plugin {
  const options = {
  jpg: {},
  png: { quality: 90 },
  webp: { quality: 80, alphaQuality: 80, },
  avif: false,
  bc7: false,
  astc: false,
  basis: false,
  etc: false,
  template: "@%%x",
  resolutions: { default: 1, low: 0.5 },
  fixedResolution: "default",
};
  const apConfig: AssetPackConfig = {
    entry: "./raw-assets",
    output: "./public",
   
    pipes: [
      
      pixiManifest(),
   // spineAtlasManifestMod(),
       mipmap(options),
    spineAtlasMipmap(options),
      compress(options),
    spineAtlasCompress(options),
      ...pixiPipes({
        manifest: {
          createShortcuts:true,
          
        },
      }),
      webfont()
    ],
  };

  let mode: ResolvedConfig["command"];
  let ap: AssetPack | undefined;

  return {
    name: "vite-plugin-assetpack",

    configResolved(resolvedConfig) {
      mode = resolvedConfig.command;
      if (!resolvedConfig.publicDir) return;
      if (apConfig.output) return;

      const publicDir = resolvedConfig.publicDir.replace(process.cwd(), "");
      apConfig.output =`.${publicDir}/assets/`;
    },

    async buildStart() {
      if (mode === "serve") {
        if (ap) return;
        ap = new AssetPack(apConfig);
        void ap.watch();
      } else {
        await new AssetPack(apConfig).run();
      }
    },

    async buildEnd() {
      if (ap) {
        await ap.stop();
        ap = undefined;
      }
    },
  };
}

export default defineConfig({
  plugins: [assetpackPlugin()],
});