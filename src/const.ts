import {Address} from "@graphprotocol/graph-ts";

export const HH_PLATFORM_ID = "HH"
export const UNKNOWN = "UNKNOWN"
export const PLATFORMS_MAPPING = new Map<string, string>()

PLATFORMS_MAPPING.set("0xdc9e0f10671660148bc71c36a38647470c8f9939", "RIBBON_FINANCE")
PLATFORMS_MAPPING.set("0x123683885310851ca29e83ae3ff3e2490d4420cd", "FRAX_FINANCE")
PLATFORMS_MAPPING.set("0x7cdf753b45ab0729bcfe33dc12401e55d28308a9", "BALANCER")