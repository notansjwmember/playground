import os

def create_stack():
  stack = []
  return stack

def check_if_empty(stack):
  return len(stack) == 0

def push(stack, item):
  stack.append(item)
  
def pop(stack):
  if(check_if_empty(stack)):
    return 'Stack is empty.'
  return stack.pop()

os.system('cls')

# trying out print format
print('I hate {} but I love {}\n'.format('Math', 'Science'))

# reverse of word
stack = create_stack()
word = 'ipip'

print('Word: ' + word + '\n')

for char in word:
  push(stack, char)

reversed_word = ''

count = 1
while not check_if_empty(stack):
  print('Loop count: ', count)
  reversed_word += pop(stack)
  print(reversed_word)
  count += 1

print('\nReversed word: ' + reversed_word)