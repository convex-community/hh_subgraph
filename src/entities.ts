import { Address, BigInt } from '@graphprotocol/graph-ts'
import { HH_PLATFORM_ID, PLATFORMS_MAPPING, UNKNOWN } from './const'
import { Platform, Depositor, Gauge } from '../generated/schema'
import { ERC20 } from '../generated/templates/BribeVaultTemplate/ERC20'

export function getPlatform(): Platform {
  let platform = Platform.load(HH_PLATFORM_ID)
  if (!platform) {
    platform = new Platform(HH_PLATFORM_ID)
    platform.fee = BigInt.fromI32(40000)
    platform.save()
  }
  return platform
}

export function getDepositor(id: Address): Depositor {
  const depId = id.toHexString()
  let depositor = Depositor.load(depId)
  if (!depositor) {
    depositor = new Depositor(depId)
    depositor.handle = PLATFORMS_MAPPING.has(depId) ? PLATFORMS_MAPPING[depId] : UNKNOWN
    depositor.save()
  }
  return depositor
}

export function getGauge(id: Address): Gauge {
  const depId = id.toHexString()
  let gauge = Gauge.load(depId)
  if (!gauge) {
    gauge = new Gauge(depId)
    const gaugeContract = ERC20.bind(id)
    const gaugeNameResult = gaugeContract.try_name()
    gauge.name = gaugeNameResult.reverted ? UNKNOWN : gaugeNameResult.value
    gauge.save()
  }
  return gauge
}
