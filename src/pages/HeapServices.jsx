import { useGetServicesQuery } from "../redux/serviceSlice";
import React, { useMemo } from "react";
import ServiceCard from "../components/ServiceCard";

// MaxHeap Class for Sorting Services by Rating
class MaxHeap {
    constructor() {
        this.heap = [];
    }

    getLeftChildIndex(parentIndex) { return 2 * parentIndex + 1; }
    getRightChildIndex(parentIndex) { return 2 * parentIndex + 2; }
    getParentIndex(childIndex) { return Math.floor((childIndex - 1) / 2); }

    hasLeftChild(index) { return this.getLeftChildIndex(index) < this.heap.length; }
    hasRightChild(index) { return this.getRightChildIndex(index) < this.heap.length; }
    hasParent(index) { return this.getParentIndex(index) >= 0; }

    leftChild(index) { return this.heap[this.getLeftChildIndex(index)]; }
    rightChild(index) { return this.heap[this.getRightChildIndex(index)]; }
    parent(index) { return this.heap[this.getParentIndex(index)]; }

    swap(indexOne, indexTwo) {
        [this.heap[indexOne], this.heap[indexTwo]] = [this.heap[indexTwo], this.heap[indexOne]];
    }

    peek() {
        return this.heap.length === 0 ? null : this.heap[0];
    }

    remove() {
        if (this.heap.length === 0) return null;
        const item = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();
        this.heapifyDown();
        return item;
    }

    add(service) {
        this.heap.push(service);
        this.heapifyUp();
    }

    heapifyUp() {
        let index = this.heap.length - 1;
        while (this.hasParent(index) && this.parent(index).rating < this.heap[index].rating) {
            this.swap(this.getParentIndex(index), index);
            index = this.getParentIndex(index);
        }
    }

    heapifyDown() {
        let index = 0;
        while (this.hasLeftChild(index)) {
            let largerChildIndex = this.getLeftChildIndex(index);
            if (this.hasRightChild(index) && this.rightChild(index).rating > this.leftChild(index).rating) {
                largerChildIndex = this.getRightChildIndex(index);
            }
            if (this.heap[index].rating >= this.heap[largerChildIndex].rating) {
                break;
            }
            this.swap(index, largerChildIndex);
            index = largerChildIndex;
        }
    }
}

const HeapServices = () => {
    const { data, error, isLoading } = useGetServicesQuery();

    const sortedServices = useMemo(() => {
        const maxHeap = new MaxHeap();
        if (data?.ServiceResult) {
            data.ServiceResult.forEach((service) => maxHeap.add(service));
        }
        return maxHeap.heap;
    }, [data]);

    if (isLoading) {
        return <div className="flex items-center justify-center h-screen text-lg">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-lg">Error: {error.message}</div>;
    }

    return (
        <div className="p-4 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Top Rated Services</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedServices.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </div>
        </div>
    );
};

export default HeapServices