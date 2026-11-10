import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';

export default function App() {
  // almacenar los valores de los campos del formulario
  const [cliente, setCliente] = useState('');
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precioUnitario, setPrecioUnitario] = useState('');
  
  const [mensaje, setMensaje] = useState('');
  const [esError, setEsError] = useState(false);
  const [contadorPedidos, setContadorPedidos] = useState(0);

  // Función para registrar y validar el pedido (RF-05, RF-06, RF-07, RF-08, HU-09)
  const registrarPedido = () => {
    // 1.(RF-06)
    if (!cliente.trim()) {
      setMensaje('Debe ingresar el nombre del cliente.');
      setEsError(true);
      return;
    }

    // 2.(RF-06)
    if (!producto.trim()) {
      setMensaje('Debe ingresar un producto.');
      setEsError(true);
      return;
    }

    // 3.(RF-06: no cero, no negativa, no decimal, vacía o no numérica)
    const numCantidad = Number(cantidad);
    if (!cantidad.trim() || isNaN(numCantidad) || numCantidad <= 0 || !Number.isInteger(numCantidad)) {
      setMensaje('Ingrese una cantidad válida (número entero mayor a 0).');
      setEsError(true);
      return;
    }

    // 4. (HU-09: no vacío, numérico, mayor a 0)
    const numPrecio = Number(precioUnitario);
    if (!precioUnitario.trim() || isNaN(numPrecio) || numPrecio <= 0) {
      setMensaje('Debe ingresar un precio unitario válido.');
      setEsError(true);
      return;
    }

    // 5. Calcular el valor total (HU-09: Total = Cantidad * Precio unitario)
    const valorTotal = numCantidad * numPrecio;

    // 6. Si todo es correcto, procesar el registro exitoso (RF-07, RF-08)
    setContadorPedidos(prevContador => prevContador + 1);
    setEsError(false);
    setMensaje(
      `Pedido Registrado Correctamente.\n` +
      `Cliente: ${cliente.trim()}\n` +
      `Producto: ${producto.trim()}\n` +
      `Cantidad: ${numCantidad}\n` +
      `Precio Unitario: $${numPrecio.toLocaleString()}\n` +
      `Valor Total: $${valorTotal.toLocaleString()}`
    );
  };

  // (RF-09)
  const limpiarFormulario = () => {
    setCliente('');
    setProducto('');
    setCantidad('');
    setPrecioUnitario('');
    setMensaje('');
    setEsError(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* RF-01 */}
      <Text style={styles.titulo}>Bienvenid@ A:</Text>
      <Text style={styles.titulo}>AgroPedidos Mosquera</Text>
      <Text style={styles.subtitulo}>Sistema de registro de pedidos agrícolas</Text>

      <View style={styles.formContainer}>
        {/* RF-02 */}
        <Text style={styles.label}>Nombre del Cliente:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Juan Pérez"
          placeholderTextColor="#888"
          value={cliente}
          onChangeText={setCliente}
        />

        {/* RF-03 */}
        <Text style={styles.label}>Producto Solicitado:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Papa sabanera"
          placeholderTextColor="#888"
          value={producto}
          onChangeText={setProducto}
        />

        {/* RF-04 */}
        <Text style={styles.label}>Cantidad (Unidades):</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. 5"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={cantidad}
          onChangeText={setCantidad}
        />

        {/* HU-09 */}
        <Text style={styles.label}>Precio Unitario ($):</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. 3000"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={precioUnitario}
          onChangeText={setPrecioUnitario}
        />

        {/*Botones*/}
        <View style={styles.buttonContainer}>
          <Button title="Registrar pedido" color="#2e7d32" onPress={registrarPedido} />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Limpiar formulario" color="#d32f2f" onPress={limpiarFormulario} />
        </View>
      </View>

      {/*(RF-08)*/}
      <View style={styles.infoContainer}>
        <Text style={styles.contadorText}>Pedidos válidos en la sesión: {contadorPedidos}</Text>
        {mensaje ? (
          <Text style={[styles.mensajeText, esError ? styles.errorText : styles.exitoText]}>
            {mensaje}
          </Text>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f1f8e9',
    padding: 20,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1b5e20',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 14,
    color: '#558b2f',
    textAlign: 'center',
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#c8e6c9',
    backgroundColor: '#fafafa',
    padding: 10,
    borderRadius: 6,
    fontSize: 14,
  },
  buttonContainer: {
    marginTop: 15,
  },
  infoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  contadorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 10,
  },
  mensajeText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
    padding: 10,
    borderRadius: 6,
    width: '100%',
  },
  errorText: {
    color: '#c62828',
    backgroundColor: '#ffebee',
    borderColor: '#ef9a9a',
    borderWidth: 1,
  },
  exitoText: {
    color: '#2e7d32',
    backgroundColor: '#e8f5e9',
    borderColor: '#a5d6a7',
    borderWidth: 1,
  },
});