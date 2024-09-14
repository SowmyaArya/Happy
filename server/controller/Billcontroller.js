// const fs = require('fs');
// const path = require('path');
// const PDFDocument = require('pdfkit');
// const Booking = require('../model/Booking_model');
// const Payment = require('../model/Payment_model');

// exports.generateBill = async (req, res) => {
//   try {
//     const bookings = await Booking.find({ status: 'Delivered' }).populate('productId userId');

//     if (!bookings || bookings.length === 0) {
//       return res.status(404).json({ message: 'No completed bookings found.' });
//     }

//     const totalAmount = bookings.reduce((sum, booking) => sum + booking.amount, 0);

//     const dirPath = path.join(__dirname, '..', 'bills');
//     const fileName = 'completed_bookings_bill.pdf';
//     const filePath = path.join(dirPath, fileName);

//     if (!fs.existsSync(dirPath)) {
//       fs.mkdirSync(dirPath, { recursive: true });
//     }

//     const doc = new PDFDocument();
//     const stream = fs.createWriteStream(filePath);
//     doc.pipe(stream);

//     try {
//       doc.image('F:\\HAPPY_FLOORS\\client\\src\\Images\\logo.png', 50, 45, { width: 50 });
//     } catch (err) {
//       console.error('Error loading logo:', err);
//     }

//     doc.fontSize(20).text('HAPPY FLOORS', 110, 57)
//        .fontSize(10).text('MANGALORE', 200, 65, { align: 'right' })
//        .text('Phone No: 9876543210', 200, 95, { align: 'right' })
//        .text('Bill No: A0EGB1', 200, 110, { align: 'right' })
//        .moveDown();

//     doc.fontSize(18).text('BILL', { align: 'left' })
//        .moveDown();

//     doc.fontSize(12).moveDown();

//     doc.text('SL.No', 50, 200)
//        .text('PARTICULARS', 100, 200)
//        .moveDown();

//     let yPosition = 220;
//     const payments = await Promise.all(bookings.map(booking => Payment.findOne({ orderId: booking._id })));

//     bookings.forEach((booking, index) => {
//       const payment = payments[index];
//       const rowData = [
//         (index + 1).toString(),
//         `Product ID: ${booking.productId}\nName: ${booking.name}\nBooking ID: ${booking._id}\nPayment Status: ${payment ? payment.paymentStatus : 'N/A'}\nQuantity: ${booking.quantity}\nUser Phone: ${booking.phone}`,
//       ];

//       doc.text(rowData[0], 50, yPosition);
//       doc.text(rowData[1], 100, yPosition);
//       doc.moveDown();

//       yPosition += 100;

//       if (index < bookings.length - 1 && yPosition > 700) {
//         doc.addPage();
//         yPosition = 50;
//       }
//     });

//     doc.fontSize(12).text(`TOTAL AMOUNT: ${totalAmount.toFixed(2)}`, 50, yPosition + 20)
//        .moveDown();

//     doc.text('Signature: Happyfloors', 400, yPosition + 80, { align: 'right' })
//        .text(`Date: ${new Date().toLocaleDateString()}`, 100, yPosition + 100, { align: 'right' });

//     doc.end();

//     stream.on('finish', () => {
//       res.download(filePath, fileName, (err) => {
//         if (err) {
//           console.error(err);
//           return res.status(500).json({ message: 'Error downloading file' });
//         }
//         fs.unlinkSync(filePath);
//       });
//     });

//     stream.on('error', (err) => {
//       console.error('Stream error:', err);
//       res.status(500).json({ message: 'Error generating file' });
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// --------working one

const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const Booking = require('../model/Booking_model'); // Adjust the path as needed
const Payment = require('../model/Payment_model'); // Adjust the path as needed
const Bill = require('../model/Bill_model'); // Adjust the path as needed

const uploadFolder = path.join(__dirname, '..', 'Uploads'); // Use 'Uploads' folder

exports.generateBill = async (req, res) => {
  try {
    // Fetch completed bookings and calculate total amount
    const bookings = await Booking.find({ status: 'Delivered' }).populate('productId userId');
    
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: 'No completed bookings found.' });
    }

    // Calculate total amount
    const totalAmount = bookings.reduce((sum, booking) => sum + booking.amount, 0);

    const fileName = 'completed_bookings_bill.pdf';
    const filePath = path.join(uploadFolder, fileName);

    // Ensure the directory exists
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, { recursive: true });
    }

    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    try {
      doc.image('F:\\HAPPY_FLOORS\\client\\src\\Images\\logo.png', 50, 45, { width: 50 });
    } catch (err) {
      console.error('Error loading logo:', err);
    }

    doc.fontSize(20).text('HAPPY FLOORS', 110, 57)
       .fontSize(10).text('MANGALORE', 200, 65, { align: 'right' })
       .text('Phone No: 9876543210', 200, 95, { align: 'right' })
       .text('Bill No: A0EGB1', 200, 110, { align: 'right' })
       .moveDown();

    doc.fontSize(18).text('BILL', { align: 'left' })
       .moveDown();

    doc.fontSize(12).moveDown();

    doc.text('SL.No', 50, 200)
       .text('PARTICULARS', 100, 200)
       .moveDown();

    let yPosition = 220;
    const payments = await Promise.all(bookings.map(booking => Payment.findOne({ orderId: booking._id })));

    bookings.forEach((booking, index) => {
      const payment = payments[index];
      const rowData = [
        (index + 1).toString(),
        `Product ID: ${booking.productId}\nName: ${booking.fullName}\nBooking ID: ${booking._id}\nQuantity: ${booking.quantity}\n Phone Number: ${booking.phoneNumber}`,
      ];

      doc.text(rowData[0], 50, yPosition);
      doc.text(rowData[1], 100, yPosition);
      doc.moveDown();

      yPosition += 100;

      if (index < bookings.length - 1 && yPosition > 700) {
        doc.addPage();
        yPosition = 50;
      }
    });

    doc.fontSize(12).text(`TOTAL AMOUNT: ${totalAmount.toFixed(2)}`, 50, yPosition + 20)
       .moveDown();

    doc.text('Signature: Happyfloors', 400, yPosition + 80, { align: 'right' })
       .text(`Date: ${new Date().toLocaleDateString()}`, 100, yPosition + 100, { align: 'right' });

    doc.end();

    stream.on('finish', async () => {
      try {
        // Save bill information to the database
        const bill = new Bill({
          bookingIds: bookings.map(booking => booking._id),
          filePath: filePath,
          fileName: fileName
        });

        await bill.save();

        // Send the file to the client
        res.download(filePath, fileName, (err) => {
          if (err) {
            console.error('Error sending file:', err);
            return res.status(500).json({ message: 'Error downloading file' });
          }
          fs.unlinkSync(filePath); // Clean up file after download
        });
      } catch (dbError) {
        console.error('Error saving bill to database:', dbError);
        res.status(500).json({ message: 'Error saving bill to database' });
      }
    });

    stream.on('error', (err) => {
      console.error('Stream error:', err);
      res.status(500).json({ message: 'Error generating file' });
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// exports.download = async (req, res) => {
//     try {
//       const bill = await Bill.findOne({ bookingIds: req.params.bookingId });
//       if (!bill) return res.status(404).send('Bill not found');
  
//       const filePath = path.join(__dirname, '../', bill.filePath);
//       if (fs.existsSync(filePath)) {
//         res.download(filePath, bill.fileName);
//       } else {
//         res.status(404).send('File not found');
//       }
//     } catch (error) {
//       console.error('Error downloading bill:', error);
//       res.status(500).send('Server error');
//     }
//   };
  
exports.download = async (req, res) => {
    try {
      // Find the bill that includes the given bookingId
      const bill = await Bill.findOne({ bookingIds: req.params.bookingId });
      if (!bill) {
        return res.status(404).send('Bill not found');
      }
  
      // Resolve the file path
      const filePath = path.resolve(__dirname, '../', bill.filePath);
      console.log('File path:', filePath); // Log file path for debugging
  
      // Check if the file exists
      if (fs.existsSync(filePath)) {
        // Send the file for download
        res.download(filePath, bill.fileName);
      } else {
        res.status(404).send('File not found');
      }
    } catch (error) {
      console.error('Error downloading bill:', error);
      res.status(500).send('Server error');
    }
  };
  
  