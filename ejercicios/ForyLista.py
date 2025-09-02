lista = (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20)
lista2 = (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20)


for numero in lista:
    if numero // 2 == 0:
        print(f"{numero} es divisible por 2.")
    else:
        print(f"")


for numero in lista:
    if numero ** 3 == 0:
        print(f"{numero} es divisible por 3.")

    else:
        print(f"")
for i in lista:
    r = i ** 2
    print(f"El cuadrado de {i} es {r}")

for i in lista:
    r = i // 2
    print(f"La mitad de {i} es {r}")



for a, b in zip(lista, lista2):
    print(f'La multi de {a} y {b} es {a * b}')