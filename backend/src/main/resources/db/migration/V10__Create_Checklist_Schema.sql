-- Checklist Template Table
CREATE TABLE checklist_templates (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_by INTEGER REFERENCES users(id),
  priority VARCHAR(10) CHECK (priority IN ('HIGH', 'MEDIUM', 'LOW')) DEFAULT 'MEDIUM',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Checklist Steps Table
CREATE TABLE checklist_steps (
  id SERIAL PRIMARY KEY,
  template_id INTEGER REFERENCES checklist_templates(id) ON DELETE CASCADE,
  step_name VARCHAR(100) NOT NULL,
  step_description TEXT,
  step_order INTEGER NOT NULL,
  role_responsible VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Checklist Assignment Table
CREATE TABLE checklist_assignments (
  id SERIAL PRIMARY KEY,
  template_id INTEGER REFERENCES checklist_templates(id),
  assigned_to_id INTEGER REFERENCES users(id),
  status VARCHAR(20) DEFAULT 'IN_PROGRESS',
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);

-- Checklist Step Status Table
CREATE TABLE checklist_step_status (
  id SERIAL PRIMARY KEY,
  assignment_id INTEGER REFERENCES checklist_assignments(id) ON DELETE CASCADE,
  step_id INTEGER REFERENCES checklist_steps(id),
  status VARCHAR(20) DEFAULT 'PENDING',
  remarks TEXT,
  attachment_path TEXT,
  assigned_to_id INTEGER REFERENCES users(id),
  completed_by INTEGER REFERENCES users(id),
  completed_at TIMESTAMP
);
