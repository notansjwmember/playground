import os
os.system('cls')

nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

for num in nums:
    msg = ''
    if num % 2 == 0:
        msg += 'div by 2'
    if num % 3 == 0:
        if msg:
            msg += ' and 3'
        else:
            msg = 'div by 3'
    if num % 5 == 0:
        if msg:
            msg += ' and 5'
        else:
            msg = 'div by 5'
    
    if not msg:
        print(num)
    else:
        print(num, msg)