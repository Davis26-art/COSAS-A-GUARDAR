def Verificar_Edad(edad):

    if edad < 0:
        return "Error: La edad no puede ser negativa."
    elif edad < 18:
        return "Eres menor de edad."
    elif 18 <= edad < 65:
        return "Eres adulto."
    else:
        return "Eres adulto mayor."
    
print(Verificar_Edad(int(input("Por favor, ingresa tu edad: "))))