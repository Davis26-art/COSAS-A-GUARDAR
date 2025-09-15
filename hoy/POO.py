class Vehiculo:
    def __init__(self, motor, color, capacidad):
        self.motor = motor
        self.color = color
        self.capacidad = capacidad
        
carros = Vehiculo( 1300,'rojo', 5)
print(carros.motor)
print(carros.color)
print(carros.capacidad)


