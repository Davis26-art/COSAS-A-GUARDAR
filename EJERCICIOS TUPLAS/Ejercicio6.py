numero = [1, 10, 15, 20, 30, 40, 50, 7, 20]

def saludar(nombre):
    print('Hola Python saluda', nombre)
saludar('Ivan')

def numero1(numero):
    print('Hola Python saluda', numero)
numero1(numero)


Diccionario = [{'nombre': 'David','edad': 19, 'ciudad': 'Madrid'},
                {'nombre': 'Juan', 'edad': 26, 'ciudad': 'Funza'},
                {'nombre': 'Steban', 'edad': 23, 'ciudad': 'Mosquera'},
                {'nombre': 'Santiago', 'edad': 21, 'ciudad': 'Cota'},
                {'nombre': 'Alejandro', 'edad': 21, 'ciudad': 'Soacha'},
                {'nombre': 'Pedro', 'edad': 22, 'ciudad': 'Faca'}]

print(Diccionario[0]['nombre'])
print(Diccionario[1]['nombre'])
print(Diccionario[2]['nombre'])
print(Diccionario[3]['nombre'])
print(Diccionario[4]['nombre'])
print(Diccionario[5]['nombre'])

for i in range(0, len(Diccionario)): 
    nombrevalor = Diccionario[i]['nombre']
    print(nombrevalor)

nombre1 = 'Davis'
edad1 = 19

archivo = open('Dic.txt', 'a')
archivo.write(nombre1 + ', ' + str(edad1) + '\n' )
archivo.close()
