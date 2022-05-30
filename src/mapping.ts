import { BigInt } from "@graphprotocol/graph-ts"
import {
  BribeVault,
  DepositBribe,
  EmergencyWithdrawal,
  GrantDepositorRole,
  RevokeDepositorRole,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  SetDistributor,
  SetFee,
  SetFeeRecipient,
  TransferBribe
} from "../generated/BribeVault/BribeVault"
import { ExampleEntity } from "../generated/schema"

export function handleDepositBribe(event: DepositBribe): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.bribeIdentifier = event.params.bribeIdentifier
  entity.rewardIdentifier = event.params.rewardIdentifier

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.DEFAULT_ADMIN_ROLE(...)
  // - contract.DEPOSITOR_ROLE(...)
  // - contract.FEE_DIVISOR(...)
  // - contract.FEE_MAX(...)
  // - contract.bribes(...)
  // - contract.distributor(...)
  // - contract.fee(...)
  // - contract.feeRecipient(...)
  // - contract.getBribe(...)
  // - contract.getBribeIdentifiersByRewardIdentifier(...)
  // - contract.getRoleAdmin(...)
  // - contract.hasRole(...)
  // - contract.rewardToBribes(...)
  // - contract.rewardTransfers(...)
  // - contract.supportsInterface(...)
}

export function handleEmergencyWithdrawal(event: EmergencyWithdrawal): void {}

export function handleGrantDepositorRole(event: GrantDepositorRole): void {}

export function handleRevokeDepositorRole(event: RevokeDepositorRole): void {}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {}

export function handleRoleGranted(event: RoleGranted): void {}

export function handleRoleRevoked(event: RoleRevoked): void {}

export function handleSetDistributor(event: SetDistributor): void {}

export function handleSetFee(event: SetFee): void {}

export function handleSetFeeRecipient(event: SetFeeRecipient): void {}

export function handleTransferBribe(event: TransferBribe): void {}
