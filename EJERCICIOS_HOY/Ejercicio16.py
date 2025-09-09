#----------------------------------------------
# EJERCICIO 16 -- Manipulación de listas de frutas
#----------------------------------------------

frutas = ["manzana", "banana", "kiwi", "sandía", "uva"]

print("Mis frutas favoritas son:")
print("Lista completa:", frutas)
print("Total de frutas:", len(frutas))  # Contamos los elementos con len()

print("\nAccediendo a frutas individuales:")
print("Primera fruta:", frutas[0])  # Primer elemento
print("Tercera fruta:", frutas[2])  # Tercer elemento
print("Última fruta:", frutas[-1])  # Último elemento
print("Antepenúltima fruta:", frutas[-3])  # Tercer desde el final
print("Frutas desde la segunda hasta la cuarta:", frutas[1:4])  # Sublista desde el segundo hasta el cuarto