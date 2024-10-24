-- Clean up existing data (in reverse order of dependencies)
TRUNCATE TABLE public.wishlist_items CASCADE;
TRUNCATE TABLE public.cart_items CASCADE;
TRUNCATE TABLE public.order_shipping CASCADE;
TRUNCATE TABLE public.order_payments CASCADE;
TRUNCATE TABLE public.order_items CASCADE;
TRUNCATE TABLE public.orders CASCADE;
TRUNCATE TABLE public.payment_methods CASCADE;
TRUNCATE TABLE public.addresses CASCADE;
TRUNCATE TABLE public.product_images CASCADE;
TRUNCATE TABLE public.barcodes CASCADE;
TRUNCATE TABLE public.products CASCADE;
TRUNCATE TABLE public.categories CASCADE;
TRUNCATE TABLE public.customers CASCADE;
TRUNCATE TABLE public.users CASCADE;
TRUNCATE TABLE public.newsletter_emails CASCADE;
TRUNCATE TABLE public.app_releases CASCADE;
TRUNCATE TABLE public.delete_requests CASCADE;

-- Insert test branches (assuming branches table exists)
INSERT INTO public.branches (id, name, address, city, state, country)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Main Branch', '123 Main St', 'Los Angeles', 'CA', 'USA'),
  ('22222222-2222-2222-2222-222222222222', 'East Branch', '456 East St', 'New York', 'NY', 'USA');

-- Insert users with different roles
INSERT INTO public.users (id, role, first_name, last_name, admin_pin, email, branch_id)
VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'admin', 'John', 'Admin', '1234', 'admin@test.com', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'sales', 'Jane', 'Sales', '5678', 'sales@test.com', '11111111-1111-1111-1111-111111111111'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'driver', 'Bob', 'Driver', '9012', 'driver@test.com', '11111111-1111-1111-1111-111111111111'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'independent_sales', 'Sarah', 'Independent', '3456', 'independent@test.com', '11111111-1111-1111-1111-111111111111');

-- Insert customers
INSERT INTO public.customers (id, first_name, last_name, business_name, phone, email, customer_type, belongs_to, branch_id, approved, tax_id, tobacco_license)
VALUES
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Mike', 'Retail', 'Mike''s Shop', '555-0001', 'mike@test.com', 'retail', 'wholesale', '11111111-1111-1111-1111-111111111111', true, 'TAX001', 'TOB001'),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Lisa', 'Wholesale', 'Lisa''s Distribution', '555-0002', 'lisa@test.com', 'wholesale', 'wholesale', '11111111-1111-1111-1111-111111111111', true, 'TAX002', 'TOB002'),
  ('gggggggg-gggg-gggg-gggg-gggggggggggg', 'Tom', 'Independent', 'Tom''s Store', '555-0003', 'tom@test.com', 'retail', 'independent', '11111111-1111-1111-1111-111111111111', false, 'TAX003', 'TOB003');

-- Insert categories
INSERT INTO public.categories (id, name, description, branch_id, is_featured)
VALUES
  ('hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh', 'Electronics', 'Electronic devices and accessories', '11111111-1111-1111-1111-111111111111', true),
  ('iiiiiiii-iiii-iiii-iiii-iiiiiiiiiiii', 'Groceries', 'Food and household items', '11111111-1111-1111-1111-111111111111', false),
  ('jjjjjjjj-jjjj-jjjj-jjjj-jjjjjjjjjjjj', 'Clothing', 'Apparel and accessories', '11111111-1111-1111-1111-111111111111', true);

-- Insert products
INSERT INTO public.products (id, name, description, retail_price, wholesale_price, cost_price, branch_id, "categoryId", is_featured, manufacturer)
VALUES
  ('kkkkkkkk-kkkk-kkkk-kkkk-kkkkkkkkkkkk', 'Smartphone', 'Latest model smartphone', 999.99, 799.99, 600.00, '11111111-1111-1111-1111-111111111111', 'hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh', true, 'TechCorp'),
  ('llllllll-llll-llll-llll-llllllllllll', 'Bread', 'Fresh baked bread', 4.99, 3.99, 2.00, '11111111-1111-1111-1111-111111111111', 'iiiiiiii-iiii-iiii-iiii-iiiiiiiiiiii', false, 'BakeryInc'),
  ('mmmmmmmm-mmmm-mmmm-mmmm-mmmmmmmmmmmm', 'T-Shirt', 'Cotton t-shirt', 19.99, 14.99, 8.00, '11111111-1111-1111-1111-111111111111', 'jjjjjjjj-jjjj-jjjj-jjjj-jjjjjjjjjjjj', true, 'FashionCo');

-- Insert addresses
INSERT INTO public.addresses (id, type, street, city, state, zip_code, country, customer_id)
VALUES
  ('nnnnnnnn-nnnn-nnnn-nnnn-nnnnnnnnnnnn', 'billing', '789 Billing St', 'Chicago', 'IL', '60601', 'United States', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee'),
  ('oooooooo-oooo-oooo-oooo-oooooooooooo', 'delivery', '101 Delivery Ave', 'Chicago', 'IL', '60601', 'United States', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee'),
  ('pppppppp-pppp-pppp-pppp-pppppppppppp', 'billing', '202 Payment Rd', 'New York', 'NY', '10001', 'United States', 'ffffffff-ffff-ffff-ffff-ffffffffffff');

-- Insert payment methods
INSERT INTO public.payment_methods (id, token, last_four, provider, customer_id)
VALUES
  ('qqqqqqqq-qqqq-qqqq-qqqq-qqqqqqqqqqqq', 'tok_visa_1234', '4242', 'visa', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee'),
  ('rrrrrrrr-rrrr-rrrr-rrrr-rrrrrrrrrrrr', 'tok_mastercard_5678', '5678', 'master', 'ffffffff-ffff-ffff-ffff-ffffffffffff');

-- Insert orders
INSERT INTO public.orders (id, type, status, total_quantity, total_amount, customer_id, branch_id, delivery_address_id)
VALUES
  ('ssssssss-ssss-ssss-ssss-ssssssssssss', 'delivery', 'confirmed', 2, 1024.98, 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '11111111-1111-1111-1111-111111111111', 'oooooooo-oooo-oooo-oooo-oooooooooooo'),
  ('tttttttt-tttt-tttt-tttt-tttttttttttt', 'pickup', 'completed', 3, 24.97, 'ffffffff-ffff-ffff-ffff-ffffffffffff', '11111111-1111-1111-1111-111111111111', 'pppppppp-pppp-pppp-pppp-pppppppppppp');

-- Insert order items
INSERT INTO public.order_items (id, order_id, product_id, quantity, unit_price, total_price, tax_amount, discount_amount)
VALUES
  ('uuuuuuuu-uuuu-uuuu-uuuu-uuuuuuuuuuuu', 'ssssssss-ssss-ssss-ssss-ssssssssssss', 'kkkkkkkk-kkkk-kkkk-kkkk-kkkkkkkkkkkk', 1, 999.99, 999.99, 25.00, 0),
  ('vvvvvvvv-vvvv-vvvv-vvvv-vvvvvvvvvvvv', 'ssssssss-ssss-ssss-ssss-ssssssssssss', 'llllllll-llll-llll-llll-llllllllllll', 5, 4.99, 24.95, 0, 0);

-- Insert order payments
INSERT INTO public.order_payments (id, payment_type, payment_status, payment_amount, order_id, payment_method_id)
VALUES
  ('wwwwwwww-wwww-wwww-wwww-wwwwwwwwwwww', 'card', 'approved', 1024.98, 'ssssssss-ssss-ssss-ssss-ssssssssssss', 'qqqqqqqq-qqqq-qqqq-qqqq-qqqqqqqqqqqq'),
  ('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', 'cash', 'approved', 24.97, 'tttttttt-tttt-tttt-tttt-tttttttttttt', null);

-- Insert cart items
INSERT INTO public.cart_items (id, product_id, customer_id, quantity)
VALUES
  ('yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy', 'mmmmmmmm-mmmm-mmmm-mmmm-mmmmmmmmmmmm', 'gggggggg-gggg-gggg-gggg-gggggggggggg', 2);

-- Insert wishlist items
INSERT INTO public.wishlist_items (id, product_id, customer_id)
VALUES
  ('zzzzzzzz-zzzz-zzzz-zzzz-zzzzzzzzzzzz', 'kkkkkkkk-kkkk-kkkk-kkkk-kkkkkkkkkkkk', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee');

-- Insert barcodes
INSERT INTO public.barcodes (id, barcode, product_id)
VALUES
  ('11111111-2222-3333-4444-555555555555', '123456789', 'kkkkkkkk-kkkk-kkkk-kkkk-kkkkkkkkkkkk'),
  ('22222222-3333-4444-5555-666666666666', '987654321', 'llllllll-llll-llll-llll-llllllllllll');

-- Insert product images
INSERT INTO public.product_images (id, url, path, product_id)
VALUES
  ('33333333-4444-5555-6666-777777777777', 'https://example.com/images/smartphone.jpg', '/images/smartphone.jpg', 'kkkkkkkk-kkkk-kkkk-kkkk-kkkkkkkkkkkk'),
  ('44444444-5555-6666-7777-888888888888', 'https://example.com/images/tshirt.jpg', '/images/tshirt.jpg', 'mmmmmmmm-mmmm-mmmm-mmmm-mmmmmmmmmmmm');

-- Insert newsletter emails
INSERT INTO public.newsletter_emails (id, email, branch_id)
VALUES
  ('55555555-6666-7777-8888-999999999999', 'newsletter1@test.com', '11111111-1111-1111-1111-111111111111'),
  ('66666666-7777-8888-9999-aaaaaaaaaaaa', 'newsletter2@test.com', '11111111-1111-1111-1111-111111111111');

-- Insert app releases
INSERT INTO public.app_releases (id, version, must_update, message, branch_id)
VALUES
  ('77777777-8888-9999-aaaa-bbbbbbbbbbbb', '1.0.0', false, 'Initial release', '11111111-1111-1111-1111-111111111111'),
  ('88888888-9999-aaaa-bbbb-cccccccccccc', '1.1.0', true, 'Critical security update', '11111111-1111-1111-1111-111111111111');