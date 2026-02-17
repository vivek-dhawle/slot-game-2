import "@esotericsoftware/spine-pixi-v8";
import { Spine } from "@esotericsoftware/spine-pixi-v8";

let spineTemplates: Spine[] = [];

export function createLonghornSpine() {

    if (spineTemplates.length > 0) {
        return spineTemplates;
    }

    const spineFiles = [
        { skeleton: "HV1_longhorn.json", atlas: "HV1_longhorn.atlas" },
        { skeleton: "HV2_cowboy.json", atlas: "HV2_cowboy.atlas" },
        { skeleton: "LV_texas.json", atlas: "LV_texas.atlas" },
        { skeleton: "MV2_cactus.json", atlas: "MV2_cactus.atlas" },
        { skeleton: "LV_a.json", atlas: "LV_a.atlas" },
        { skeleton: "LV_k.json", atlas: "LV_k.atlas" },
        { skeleton: "LV_q.json", atlas: "LV_q.atlas" },
        { skeleton: "LV_j.json", atlas: "LV_j.atlas" },
        { skeleton: "special_coin.json", atlas: "special_coin.atlas" },
        { skeleton: "BONUS.json", atlas: "BONUS.atlas" },
        { skeleton: "WILD.json", atlas: "WILD.atlas" },
    ];

    spineTemplates = spineFiles.map(file =>
        Spine.from({
            skeleton: file.skeleton,
            atlas: file.atlas
        })
    );

    return spineTemplates;
}
