const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/cac_optimizer', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function fixEmployeeBusinessId() {
  try {
    const admin = await User.findOne({ email: 'kumaramit10946@gmail.com' });
    if (!admin) {
      console.log('Admin not found!');
      return;
    }
    const result = await User.updateOne(
      { email: 'ui22ec01@iiitsurat.ac.in' },
      { businessId: admin.businessId }
    );
    if (result.modifiedCount === 1) {
      console.log('✅ Employee businessId updated to match admin!');
    } else {
      console.log('❌ Employee not found or businessId not updated.');
    }
    const employee = await User.findOne({ email: 'ui22ec01@iiitsurat.ac.in' });
    console.log('Employee after update:', employee);
  } catch (error) {
    console.error('Error updating employee businessId:', error);
  } finally {
    mongoose.connection.close();
  }
}

fixEmployeeBusinessId(); 