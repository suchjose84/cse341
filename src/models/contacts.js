module.exports = (mongoose) => {
    const Contact = mongoose.model(
      'contacts',
      mongoose.Schema(
        {
          firstName: String,
          lastName: String,
          email: String,
          favoriteColor: String,
          birthday: Date,
        },
        { timestamps: true }
      )
    );
  
    return Contact;
  };