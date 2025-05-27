import { User } from "../model/userModel.js";

export const updateUser = async (req, res) => {
    try {
      const { name, bio, profilePicture } = req.body;
      const userId = req.user.id;

      const updateData = {
        name,
        bio,
        profilePicture,
      };

    
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        updateData,
        { new: true, runValidators: true } 
      ).select("-password"); 

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({
        message: err.message.startsWith("E11000")
          ? "Username/email already exists"
          : "Validation failed",
      });
    }
}