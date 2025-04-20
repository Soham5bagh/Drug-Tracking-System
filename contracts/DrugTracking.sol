// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract DrugTracking is Ownable(msg.sender) {
    uint256 private _batchIdCounter;

    struct DrugBatch {
        string drugName;
        string batchNumber;
        uint256 quantity;
        uint256 manufacturingDate;
        uint256 expiryDate;
        address manufacturer;
        string status;
    }

    mapping(string => DrugBatch) private drugBatches;
    mapping(address => string[]) private manufacturerBatches;

    event DrugBatchRegistered(
        string indexed batchId,
        address indexed manufacturer,
        string drugName,
        string batchNumber
    );

    modifier onlyManufacturer() {
        require(msg.sender != address(0), "Invalid manufacturer address");
        _;
    }

    function registerDrugBatch(
        string memory drugName,
        string memory batchNumber,
        uint256 quantity,
        uint256 manufacturingDate,
        uint256 expiryDate
    ) public onlyManufacturer returns (string memory) {
        require(bytes(drugName).length > 0, "Drug name cannot be empty");
        require(bytes(batchNumber).length > 0, "Batch number cannot be empty");
        require(quantity > 0, "Quantity must be greater than 0");
        require(manufacturingDate < expiryDate, "Invalid dates");

        _batchIdCounter++;
        string memory batchId = string(abi.encodePacked(batchNumber, "-", Strings.toString(_batchIdCounter)));

        DrugBatch memory newBatch = DrugBatch({
            drugName: drugName,
            batchNumber: batchNumber,
            quantity: quantity,
            manufacturingDate: manufacturingDate,
            expiryDate: expiryDate,
            manufacturer: msg.sender,
            status: "MANUFACTURED"
        });

        drugBatches[batchId] = newBatch;
        manufacturerBatches[msg.sender].push(batchId);

        emit DrugBatchRegistered(batchId, msg.sender, drugName, batchNumber);
        return batchId;
    }

    function getDrugBatch(string memory batchId) public view returns (DrugBatch memory) {
        require(bytes(batchId).length > 0, "Batch ID cannot be empty");
        DrugBatch memory batch = drugBatches[batchId];
        require(batch.manufacturer != address(0), "Batch not found");
        return batch;
    }

    function getManufacturerBatches(address manufacturerAddress) public view returns (string[] memory) {
        require(manufacturerAddress != address(0), "Invalid manufacturer address");
        return manufacturerBatches[manufacturerAddress];
    }
} 