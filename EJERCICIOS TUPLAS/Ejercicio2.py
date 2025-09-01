Tuplas = (7, 8, 9, 10, 12, 15, 0, 1, 2, 3, 4, 5)
Tupla2 = 'David', 'Pedro', 'Kevin'
Tupla3 = tuple([11, 7, 25, 34, 3, 80, 42, 26, 65, 489, 589, 20])

a= 20
b =2

for i in Tuplas:
    if i %2 == 0:
        print(f'{i} es par. ')

for i in Tuplas:
    if i > 10 and i < 50:
        print(f'{i} está entre 10 y 50. ')

for i in Tupla3:
    if i > 10 and i < 50:
        print(f'{i} está entre 10 y 50. ')

contador = 0
for i in Tupla3:
    if i % 3 == 0 or i % 5 == 0:
        contador += 1
        print(f'{i} es multiplo de 3 o de 5. ')
print(f'La cantidad de números multiplos entre 3  o 5 son: {contador}')

