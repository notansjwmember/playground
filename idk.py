import os
os.system('cls')

# for i in range(50):
#   num = i + 1
  
#   if (num) % 6 == 0:
#       print(f'{num} divisible by 4 and 6')
#   elif (num) % 4 == 0:
#       print(f'{num} divisible by 4')
#   elif (num) % 6 == 0:
#     print(f'{num} divisible by 6')
    
#   else:
#     print(num)

# def is_prime(num):
#   if num <= 1:
#     return False
#   for i in range(2, int(num ** 0.5) + 1):
#     print(f'Square root of {num}: {int(num ** 0.5)}')
#     if num % i == 0:
#       print(f"False remainder: {num % i}")
#       return False
#     else:
#       print(f"True remainder: {num % i}")
#   return True

# for n in range(1):
#   n = 7
#   if is_prime(n):
#     print(f"{n} is a prime number")
#   else:
#     print(f"{n} is not a prime number")

# for n in range(1, 101):
#   if n % 3 == 0 and n % 7 == 0:
#     print(f"{n} is multiple by 3 and 7")
#   elif n % 3 == 0:
#     print(f"{n} is multiple by 3")
#   elif n % 7 == 0:
#     print(f"{n} is multiple by 7")
#   else:
#     print(n)

# def fibonacci(n):
#   a,b = 0,1
#   for _ in range(n):
#     print(a, end=' ')
#     a, b = b, a + b
    
# fibonacci(8)

# def is_palindrome(word):
#   if word == word[::-1]:
#     print(f'{word} is a palindrome')
#   else:
#     print(f'{word} is not a palindrome')

# def is_palindrome(word):
#   reversed_str = ''
#   for char in word:
#     reversed_str = char + reversed_str
#   if word == reversed_str:
#     print(f'{word} is a palindrome')
#   else:
#     print(f'{word} is not a palindrome')
#   print(f'\nWord: {word}')
#   print(f'Reversed: {reversed_str}')

# is_palindrome('huh')

# nums = [12,3,6,17,8]
# for i in range(len(nums)):
#   for j in range(len(nums) - 1):
#     if nums[j] > nums[j + 1]:
#       nums[j], nums[j + 1] = nums[j + 1], nums[j]

# print(nums)

# nums = [5,2,6,4,12]
# for i in range(len(nums)):
#     swapped = False
#     for j in range(len(nums) - 1 - i):
#         if nums[j] > nums[j + 1]:
#             nums[j], nums[j+1] = nums[j+1], nums[j]
#             swapped = True
#     if not swapped:
#         break

# print(nums)