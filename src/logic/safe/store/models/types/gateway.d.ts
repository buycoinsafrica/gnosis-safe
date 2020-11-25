type TransferDirection = 'INCOMING' | 'OUTGOING' | 'UNKNOWN'

type Erc20Transfer = {
  type: 'ERC20'
  tokenAddress: string
  tokenName: string | null
  tokenSymbol: string | null
  logoUri: string | null
  decimals: number | null
  value: string
}

type Erc721Transfer = {
  type: 'ERC721'
  tokenAddress: string
  tokenId: string
  tokenName: string | null
  tokenSymbol: string | null
  logoUri: string | null
}

type NativeTransfer = {
  type: 'ETHER'
  value: string
}

type TransferInfo = Erc20Transfer | Erc721Transfer | NativeTransfer

export type Transfer = {
  type: 'Transfer'
  sender: string
  recipient: string
  direction: TransferDirection
  transferInfo: TransferInfo // Polymorphic: Erc20, Erc721, Ether
}

enum Operation {
  CALL,
  DELEGATE,
}

type InternalTransaction = {
  operation: Operation
  to: string
  value: number | null
  data: string | null
  dataDecoded: DataDecoded | null
}

type ValueDecodedType = InternalTransaction[]

type SingleTransactionMethodParameter = {
  name: string
  type: string
  value: string
}

type MultiSendTransactionMethodParameter = {
  valueDecoded: ValueDecodedType
}

type Parameter = SingleTransactionMethodParameter | MultiSendTransactionMethodParameter

type DataDecoded = {
  method: string
  parameters: Parameter[] | null
}

type SetFallbackHandler = {
  type: 'SET_FALLBACK_HANDLER'
  handler: string
}

type AddOwner = {
  type: 'ADD_OWNER'
  owner: string
  threshold: number
}

type RemoveOwner = {
  type: 'REMOVE_OWNER'
  owner: string
  threshold: number
}

type SwapOwner = {
  type: 'SWAP_OWNER'
  oldOwner: string
  newOwner: string
}

type ChangeThreshold = {
  type: 'CHANGE_THRESHOLD'
  threshold: number
}

type ChangeImplementation = {
  type: 'CHANGE_IMPLEMENTATION'
  implementation: string
}

type EnableModule = {
  type: 'ENABLE_MODULE'
  module: string
}

type DisableModule = {
  type: 'DISABLE_MODULE'
  module: string
}

type SettingsInfo =
  | SetFallbackHandler
  | AddOwner
  | RemoveOwner
  | SwapOwner
  | ChangeThreshold
  | ChangeImplementation
  | EnableModule
  | DisableModule

type SettingsChange = {
  type: 'SettingsChange'
  dataDecoded: DataDecoded
  settingsInfo: SettingsInfo | null
}

type Custom = {
  type: 'Custom'
  to: string
  dataSize: string
  value: string
  methodName: string | null
}

type Creation = {
  type: 'Creation'
  creator: string
  transactionHash: string
  masterCopy: string | null
  factory: string | null
}

type TransactionStatus = 'AWAITING_CONFIRMATIONS' | 'AWAITING_EXECUTION' | 'CANCELLED' | 'FAILED' | 'SUCCESS'

type TransactionInfo = Transfer | SettingsChange | Custom | Creation

type ExecutionInfo = {
  nonce: number
  confirmationsRequired: number
  confirmationsSubmitted: number
}

export type TransactionSummary = {
  id: string
  timestamp: number
  txStatus: TransactionStatus
  txInfo: TransactionInfo // Polymorphic: Transfer, SettingsChange, Custom, Creation
  executionInfo: ExecutionInfo | null
}