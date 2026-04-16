const mongoose = require('mongoose');

const testDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/eventosUPP');
    console.log('✅ Conexión exitosa a eventosUPP');
    
    // Acceder a la colección eventos directamente
    const eventos = await mongoose.connection.db.collection('eventos').find().toArray();
    console.log(`✅ ¡Se encontraron ${eventos.length} eventos en la base de datos!`);
    console.log('Primer evento recuperado:');
    console.log(JSON.stringify(eventos[0], null, 2));

    process.exit(0);
  } catch (error) {
    console.error('❌ Error de conexión:', error);
    process.exit(1);
  }
};

testDB();
