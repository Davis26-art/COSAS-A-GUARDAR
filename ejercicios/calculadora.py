def Calculadora():
    print("Bienvenido a la calculadora")
    print("Seleccione la operacion que desea realizar:")
    print("1. Suma")
    print("2. Resta")
    print("3. Multiplicacion")
    print("4. Division")
    print("5. Salir")

 
    opcion = input("Ingrese la opcion (1/2/3/4/5): ")
    if opcion in ['1', '2', '3', '4']:
        
        num1 = float(input("Ingrese el primer numero: "))
        num2 = float(input("Ingrese el segundo numero: "))

        if opcion == '1':
            print(f"{num1} + {num2} = {num1 + num2}")
        elif opcion == '2':
            print(f"{num1} - {num2} = {num1 - num2}")
        elif opcion == '3':
            print(f"{num1} * {num2} = {int(num1 * num2)}")
        elif opcion == '4':
            if num2 != 0:
                print(f"{num1} / {num2} = {num1 / num2}")
            else:
                print("Error: Division por cero no es permitida.")
        elif opcion == '5':
            print("Saliendo de la calculadora. Gracias por usarla.")
    else:
        print("Opcion invalida. Por favor seleccione una opcion valida.")
            
print(Calculadora())