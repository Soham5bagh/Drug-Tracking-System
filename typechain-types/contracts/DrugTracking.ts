/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export declare namespace DrugTracking {
  export type DrugBatchStruct = {
    drugName: string;
    batchNumber: string;
    quantity: BigNumberish;
    manufacturingDate: BigNumberish;
    expiryDate: BigNumberish;
    manufacturer: AddressLike;
    status: string;
  };

  export type DrugBatchStructOutput = [
    drugName: string,
    batchNumber: string,
    quantity: bigint,
    manufacturingDate: bigint,
    expiryDate: bigint,
    manufacturer: string,
    status: string
  ] & {
    drugName: string;
    batchNumber: string;
    quantity: bigint;
    manufacturingDate: bigint;
    expiryDate: bigint;
    manufacturer: string;
    status: string;
  };
}

export interface DrugTrackingInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "getDrugBatch"
      | "getManufacturerBatches"
      | "owner"
      | "registerDrugBatch"
      | "renounceOwnership"
      | "transferOwnership"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "DrugBatchRegistered" | "OwnershipTransferred"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "getDrugBatch",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getManufacturerBatches",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "registerDrugBatch",
    values: [string, string, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "getDrugBatch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getManufacturerBatches",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "registerDrugBatch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
}

export namespace DrugBatchRegisteredEvent {
  export type InputTuple = [
    batchId: string,
    manufacturer: AddressLike,
    drugName: string,
    batchNumber: string
  ];
  export type OutputTuple = [
    batchId: string,
    manufacturer: string,
    drugName: string,
    batchNumber: string
  ];
  export interface OutputObject {
    batchId: string;
    manufacturer: string;
    drugName: string;
    batchNumber: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface DrugTracking extends BaseContract {
  connect(runner?: ContractRunner | null): DrugTracking;
  waitForDeployment(): Promise<this>;

  interface: DrugTrackingInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  getDrugBatch: TypedContractMethod<
    [batchId: string],
    [DrugTracking.DrugBatchStructOutput],
    "view"
  >;

  getManufacturerBatches: TypedContractMethod<
    [manufacturerAddress: AddressLike],
    [string[]],
    "view"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  registerDrugBatch: TypedContractMethod<
    [
      drugName: string,
      batchNumber: string,
      quantity: BigNumberish,
      manufacturingDate: BigNumberish,
      expiryDate: BigNumberish
    ],
    [string],
    "nonpayable"
  >;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "getDrugBatch"
  ): TypedContractMethod<
    [batchId: string],
    [DrugTracking.DrugBatchStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getManufacturerBatches"
  ): TypedContractMethod<
    [manufacturerAddress: AddressLike],
    [string[]],
    "view"
  >;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "registerDrugBatch"
  ): TypedContractMethod<
    [
      drugName: string,
      batchNumber: string,
      quantity: BigNumberish,
      manufacturingDate: BigNumberish,
      expiryDate: BigNumberish
    ],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;

  getEvent(
    key: "DrugBatchRegistered"
  ): TypedContractEvent<
    DrugBatchRegisteredEvent.InputTuple,
    DrugBatchRegisteredEvent.OutputTuple,
    DrugBatchRegisteredEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;

  filters: {
    "DrugBatchRegistered(string,address,string,string)": TypedContractEvent<
      DrugBatchRegisteredEvent.InputTuple,
      DrugBatchRegisteredEvent.OutputTuple,
      DrugBatchRegisteredEvent.OutputObject
    >;
    DrugBatchRegistered: TypedContractEvent<
      DrugBatchRegisteredEvent.InputTuple,
      DrugBatchRegisteredEvent.OutputTuple,
      DrugBatchRegisteredEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
  };
}
