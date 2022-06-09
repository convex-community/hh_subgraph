import {Address, crypto, ethereum, BigInt, Bytes, ByteArray} from "@graphprotocol/graph-ts"
import {
  BribeVault,
  DepositBribe,
  GrantDepositorRole,
  SetFee,
} from "../generated/BribeVault/BribeVault"
import {
  SetDaoProposalCall,
  SetGaugeProposalCall, SetGaugeProposalsCall
} from "../generated/templates/BribeVaultTemplate/BribeVaultTemplate"
import {getDepositor, getGauge, getPlatform} from "./entities";
import {BribeVaultTemplate} from "../generated/templates";
import {concat, uint256ToByteArray} from "./utils";
import {Proposal} from "../generated/schema";

export function handleDepositBribe(event: DepositBribe): void {
}

export function handleGrantDepositorRole(event: GrantDepositorRole): void {
  BribeVaultTemplate.create(event.params.depositor)
  getDepositor(event.params.depositor)
}

export function handleSetFee(event: SetFee): void {
  const platform = getPlatform()
  platform.fee = event.params._fee
  platform.save()
}

function getGaugeProposalHash(gauge: Address, deadline: BigInt): ByteArray {
  const gaugeHash = crypto.keccak256(gauge)
  return crypto.keccak256(concat(gaugeHash, uint256ToByteArray(deadline)))
}

export function handleSetGaugeProposal(call: SetGaugeProposalCall): void {
  const proposalHash = crypto.keccak256(call.inputs.gauge)
  const gauge = getGauge(call.inputs.gauge)
  const proposal = new Proposal(proposalHash.toHexString())
  proposal.gauge = gauge.id
  proposal.deadline = call.inputs.deadline
  proposal.depositor = call.to.toHexString()
  proposal.save()
}

export function handleSetGaugeProposals(call: SetGaugeProposalsCall): void {
  const gauges = call.inputs.gauges_
  const deadlines = call.inputs.deadlines
  for (let i = 0; i < gauges.length; i++) {
    const proposalHash = crypto.keccak256(gauges[i])
    const gauge = getGauge(gauges[i])
    const proposal = new Proposal(proposalHash.toHexString())
    proposal.gauge = gauge.id
    proposal.deadline = deadlines[i]
    proposal.depositor = call.to.toHexString()
    proposal.save()
  }
}

export function handleSetDaoProposal(call: SetDaoProposalCall): void {
  const proposalHash = crypto.keccak256(uint256ToByteArray(call.inputs.voteId))
  const proposal = new Proposal(proposalHash.toHexString())
  proposal.voteId = call.inputs.voteId
  proposal.deadline = call.inputs.deadline
  proposal.depositor = call.to.toHexString()
  proposal.save()
}
