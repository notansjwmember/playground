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

def merge_sort(arr, direction):
    print("---------------------")
    print("Direction:", direction)
    print("Initial array: [12, 11, 13, 5, 6, 7]")
    # as long as the length of array is greater than 1, trigger function
    if len(arr) > 1:
        print()
      
        mid = len(arr) // 2
        L = arr[:mid] # first elements of the array
        R = arr[mid:] # last elements of the array
        
        print("Left of array:", L)
        print("Middle of array:", arr[mid])
        print("Right of array:", R)
        print()

        # recursion
        merge_sort(L, "left")
        merge_sort(R, "right")
        print()
        print("Merge sort left:",merge_sort(L, "left"))
        print("Merge sort right:",merge_sort(R, "right"))

        i = j = k = 0 # initially set all indexes to 0

        print()
        print(f"While {i} < {len(L)} and {j} < {len(R)} then")
        while i < len(L) and j < len(R):
            print(f"If {L[i]} < {R[j]} then")
            if L[i] < R[j]:
                print(f"Set index {k} ({arr[k]}) to index {i} (Previous: {L[i]})")
                arr[k] = L[i]
                i += 1
            else:
                print(f"If {L[i]} > {R[j]} then")
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
print("Sorted array is: ", merge_sort(arr, "initial"))