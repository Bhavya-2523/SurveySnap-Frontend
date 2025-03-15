import React from 'react'

export const DemoProfile = () => {
  return (
    <div className="card card-primary card-outline p-4">
    <div className="card-header">
      <div className="card-title">User Profile</div>
    </div>
    <div className="card-body">
      {/* Full Name */}
      <div className="mb-3">
        <label className="form-label">Full Name <span className="text-danger">*</span></label>
        <input type="text" className="form-control" placeholder="Full Name" required />
      </div>

      {/* Username */}
      <div className="mb-3">
        <label className="form-label">Username <span className="text-danger">*</span></label>
        <input type="text" className="form-control" placeholder="Username" required />
      </div>

      {/* Email Address */}
      <div className="mb-3">
        <label className="form-label">Email Address <span className="text-danger">*</span></label>
        <input type="email" className="form-control" placeholder="Email" required />
      </div>

      {/* Phone Number */}
      <div className="mb-3">
        <label className="form-label">Phone Number <span className="text-danger">*</span></label>
        <input type="tel" className="form-control" placeholder="Phone Number" required />
      </div>

      {/* Date of Birth */}
      <div className="mb-3">
        <label className="form-label">Date of Birth <span className="text-danger">*</span></label>
        <input type="date" className="form-control" required />
      </div>

      {/* Profile Picture */}
      <div className="input-group mb-3">
        <input type="file" className="form-control" id="profilePicture" />
        <label className="input-group-text" htmlFor="profilePicture">Upload Profile Picture</label>
      </div>

      {/* Address */}
      <div className="mb-3">
        <label className="form-label">Street Address <span className="text-danger">*</span></label>
        <input type="text" className="form-control" placeholder="Street Address" required />
      </div>
      <div className="mb-3">
        <label className="form-label">City <span className="text-danger">*</span></label>
        <input type="text" className="form-control" placeholder="City" required />
      </div>
      <div className="mb-3">
        <label className="form-label">State <span className="text-danger">*</span></label>
        <input type="text" className="form-control" placeholder="State" required />
      </div>
      <div className="mb-3">
        <label className="form-label">ZIP Code <span className="text-danger">*</span></label>
        <input type="text" className="form-control" placeholder="ZIP Code" required />
      </div>
      <div className="mb-3">
        <label className="form-label">Country <span className="text-danger">*</span></label>
        <select className="form-select" required>
          <option selected disabled>Choose...</option>
          <option>India</option>
          <option>USA</option>
          <option>UK</option>
        </select>
      </div>

      {/* Organization */}
      <div className="mb-3">
        <label className="form-label">Organization/Company</label>
        <input type="text" className="form-control" placeholder="Organization Name" />
      </div>

      {/* Job Title */}
      <div className="mb-3">
        <label className="form-label">Job Title</label>
        <input type="text" className="form-control" placeholder="Job Title" />
      </div>

      {/* LinkedIn Profile */}
      <div className="mb-3">
        <label className="form-label">LinkedIn Profile</label>
        <input type="url" className="form-control" placeholder="LinkedIn URL" />
      </div>

      {/* Bio */}
      <div className="mb-3">
        <label className="form-label">Bio/About Me</label>
        <textarea className="form-control" rows="3" placeholder="Tell us about yourself"></textarea>
      </div>

      {/* Submit Button */}
      <div className="text-end">
        <button type="submit" className="btn btn-primary">Save Profile</button>
      </div>
    </div>
  </div>
  )
}
