import os
os.system('cls')

# # Bubble Sort
# def bubble_sort(arr):
#     n = len(arr)
#     # Traverse through all array elements
#     for i in range(n):
#         print("Row:",i)
#         print()
#         for j in range(0, n-i-1):          
#             print("Column:",j, end=" - ")
#             print(f"{arr[j]} > {arr[j+1]}")
            
#             if arr[j] > arr[j+1]:
#                 arr[j], arr[j+1] = arr[j+1], arr[j]
            
#             print("Sorted array:", arr)
#             print()
#         print()
#     return arr

# sample_list = [64, 34, 25, 12, 22, 11, 90]
# sorted_list = bubble_sort(sample_list)
# print(sorted_list)

# def insertion_sort(arr):
#     print("Length of array:", len(arr))
#     print()
    
#     for i in range(1, len(arr)):
#         key = arr[i]
#         print("----------")
#         print("Index of key:", i)
#         print("Key:", key)
#         j = i - 1
#         print("Index to compare:", j)
#         print("Key to compare:", arr[j])
#         print()
#         print("Initial array:",arr)
#         print()

#         if j >= 0 and key > arr[j]:
#             print(f"If {j} >= 0 and {key} > {arr[j]} then")
#             print("Skip")
#             print()

#         while j >= 0 and key < arr[j]:
#             print(f"If {j} >= 0 and {key} < {arr[j]} then")
            
#             print(f"Index {j+1} ({key}) is now index {j} (Previous value: {arr[j]})")
#             arr[j + 1] = arr[j]
            
#             j -= 1
            
#             if j != -1:
#               print(f"If loop is not done, keep decreasing the index: {j}")

#         print()
#         print(f"Index {j+1} is equal to {key}")
#         arr[j + 1] = key
        
#         print("Sorted array:", arr)
#         print()
#     return arr

# example_list = [12, 11, 13, 5, 6]
# insertion_sort(example_list)
# print("Final sorted array is:", example_list)

def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        L = arr[:mid]
        R = arr[mid:]

        merge_sort(L)
        merge_sort(R)

        i = j = k = 0

        while i < len(L) and j < len(R):
            if L[i] < R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1

        while i < len(L):
            arr[k] = L[i]
            i += 1
            k += 1

        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1

    return arr

arr = [12, 11, 13, 5, 6, 7]
print("Sorted array is: ", merge_sort(arr))