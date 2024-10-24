-- First, create the function that will update the timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Then, apply this trigger to all tables
-- You'll need to run this for each table
CREATE TRIGGER update_customer_modtime
    BEFORE UPDATE ON branches
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();
