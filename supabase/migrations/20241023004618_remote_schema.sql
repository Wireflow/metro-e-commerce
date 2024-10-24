create type "public"."address_type" as enum ('billing', 'delivery');

create type "public"."card_provider" as enum ('visa', 'amex', 'master', 'discover', 'unknown');

create type "public"."customer_belongs_to" as enum ('wholesale', 'independent');

create type "public"."customer_type" as enum ('wholesale', 'retail');

create type "public"."order_item_status" as enum ('confirmed', 'returned');

create type "public"."order_status" as enum ('created', 'pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled', 'refunded');

create type "public"."order_type" as enum ('delivery', 'pickup', 'shipment');

create type "public"."payment_status" as enum ('pending', 'approved', 'declined');

create type "public"."payment_type" as enum ('cash', 'check', 'later', 'card', 'online');

create type "public"."user_role" as enum ('admin', 'driver', 'sales', 'independent_sales');

drop trigger if exists "update_customer_modtime" on "public"."branches";

create table "public"."addresses" (
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "type" address_type not null,
    "street" text not null,
    "city" text not null,
    "state" text not null,
    "zip_code" text not null,
    "country" text not null default 'United States'::text,
    "customer_id" uuid not null,
    "id" uuid not null default gen_random_uuid(),
    "name" text
);


alter table "public"."addresses" enable row level security;

create table "public"."app_releases" (
    "id" uuid not null default gen_random_uuid(),
    "released_at" timestamp with time zone not null default now(),
    "version" text not null,
    "must_update" boolean not null default false,
    "message" text,
    "branch_id" uuid not null
);


alter table "public"."app_releases" enable row level security;

create table "public"."barcodes" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "barcode" text not null,
    "product_id" uuid not null
);


alter table "public"."barcodes" enable row level security;

create table "public"."branch_settings" (
    "id" uuid not null default gen_random_uuid(),
    "updated_at" timestamp with time zone not null default now(),
    "is_app_disabled" boolean not null default false,
    "is_card_payment_disabled" boolean not null default false,
    "is_pay_on_delivery_disabled" boolean not null default false,
    "is_pay_on_pickup_disabled" boolean not null default false,
    "is_shipment_disabled" boolean not null default false,
    "is_ordering_disabled" boolean not null default false,
    "branch_id" uuid not null,
    "tax_percentage" real not null default '0'::real,
    "delivery_miles_radius" integer not null default 10,
    "delivery_minimum" real not null default '0'::real,
    "pickup_minimum" real not null default '0'::real,
    "shipment_minimum" real not null default '0'::real
);


alter table "public"."branch_settings" enable row level security;

create table "public"."cart_items" (
    "created_at" timestamp with time zone not null default now(),
    "product_id" uuid not null,
    "customer_id" uuid not null,
    "quantity" integer not null default 1,
    "id" uuid not null default gen_random_uuid()
);


alter table "public"."cart_items" enable row level security;

create table "public"."categories" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "name" text not null,
    "description" text,
    "hide" boolean not null default false,
    "is_featured" boolean not null default false,
    "image_url" text,
    "image_path" text,
    "branch_id" uuid not null
);


alter table "public"."categories" enable row level security;

create table "public"."customers" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "first_name" text not null,
    "last_name" text not null,
    "business_name" text not null,
    "phone" text not null,
    "tax_id" text,
    "tobacco_license" text,
    "approved" boolean not null default false,
    "approved_at" timestamp with time zone,
    "blocked" boolean not null default false,
    "branch_id" uuid not null,
    "email" text not null,
    "opted_in_text" boolean not null default false,
    "customer_type" customer_type not null default 'retail'::customer_type,
    "belongs_to" customer_belongs_to not null default 'wholesale'::customer_belongs_to,
    "independent_sales_id" uuid,
    "tax_id_image_url" text,
    "tobacco_license_image_url" text,
    "approved_tobacco" boolean not null default false
);


alter table "public"."customers" enable row level security;

create table "public"."delete_requests" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "full_name" text not null,
    "email" text not null,
    "password" text not null,
    "reason" text not null,
    "confirm_ownership" boolean not null,
    "understand_irreversible" boolean not null,
    "additional_info" text,
    "request_number" integer generated by default as identity not null,
    "branch_id" uuid not null
);


alter table "public"."delete_requests" enable row level security;

create table "public"."newsletter_emails" (
    "id" uuid not null default gen_random_uuid(),
    "subscription_date" timestamp with time zone not null default now(),
    "is_subscribed" boolean not null default true,
    "email" text not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "branch_id" uuid not null
);


alter table "public"."newsletter_emails" enable row level security;

create table "public"."order_items" (
    "order_id" uuid not null,
    "product_id" uuid not null,
    "sku" text,
    "quantity" integer not null,
    "unit_price" numeric(10,2) not null,
    "total_price" numeric(10,2) not null,
    "refunded_quantity" integer not null default 0,
    "refunded_amount" real not null,
    "discount_amount" numeric(10,2) not null default 0,
    "tax_amount" numeric(10,2) not null default 0,
    "status" order_item_status not null default 'confirmed'::order_item_status,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "id" uuid not null default gen_random_uuid()
);


alter table "public"."order_items" enable row level security;

create table "public"."order_payments" (
    "payment_date" timestamp with time zone,
    "payment_type" payment_type not null,
    "payment_status" payment_status not null default 'pending'::payment_status,
    "payment_method_id" uuid,
    "payment_amount" real not null,
    "order_id" uuid not null,
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."order_payments" enable row level security;

create table "public"."order_shipping" (
    "id" uuid not null default gen_random_uuid(),
    "shipped_at" timestamp with time zone not null,
    "order_id" uuid not null,
    "tracking_number" text not null,
    "provider" text not null
);


alter table "public"."order_shipping" enable row level security;

create table "public"."orders" (
    "id" uuid not null default gen_random_uuid(),
    "order_number" integer generated by default as identity not null,
    "type" order_type not null,
    "status" order_status not null default 'created'::order_status,
    "updated_at" timestamp with time zone not null default now(),
    "created_at" timestamp with time zone not null default now(),
    "confirmed_at" timestamp with time zone,
    "preparing_at" timestamp with time zone,
    "ready_at" timestamp with time zone,
    "completed_at" timestamp with time zone,
    "cancelled_at" timestamp with time zone,
    "refunded_at" timestamp with time zone,
    "expected_delivery_at" timestamp with time zone,
    "total_quantity" integer not null,
    "total_amount" real not null,
    "customer_id" uuid not null,
    "branch_id" uuid not null,
    "delivery_address_id" uuid not null,
    "shipping_costs" real,
    "salesperson_id" uuid,
    "salesperson_customer_id" uuid
);


alter table "public"."orders" enable row level security;

create table "public"."payment_methods" (
    "id" uuid not null default gen_random_uuid(),
    "added_at" timestamp with time zone not null default now(),
    "token" text not null,
    "last_four" text not null,
    "provider" card_provider not null,
    "billing_address_id" uuid,
    "customer_id" uuid not null
);


alter table "public"."payment_methods" enable row level security;

create table "public"."product_images" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "url" text not null,
    "path" text not null,
    "product_id" uuid not null
);


alter table "public"."product_images" enable row level security;

create table "public"."products" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "in_stock" boolean not null default true,
    "hide" boolean not null default false,
    "name" text not null,
    "description" text,
    "retail_price" real not null,
    "wholesale_price" real not null,
    "cost_price" real not null default '0'::real,
    "discount" real,
    "discounted_until" timestamp with time zone,
    "is_tobacco" boolean not null default false,
    "unit" text,
    "branch_id" uuid not null,
    "manufacturer" text,
    "categoryId" uuid not null,
    "is_featured" boolean not null default false
);


alter table "public"."products" enable row level security;

create table "public"."users" (
    "id" uuid not null default gen_random_uuid(),
    "role" user_role not null,
    "first_name" text not null,
    "last_name" text not null,
    "admin_pin" text not null default '0000'::text,
    "blocked" boolean not null default false,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "branch_id" uuid not null,
    "email" text not null
);


alter table "public"."users" enable row level security;

create table "public"."wishlist_items" (
    "id" uuid not null default gen_random_uuid(),
    "added_at" timestamp with time zone not null default now(),
    "product_id" uuid not null,
    "customer_id" uuid not null
);


alter table "public"."wishlist_items" enable row level security;

CREATE UNIQUE INDEX addresses_pkey ON public.addresses USING btree (id);

CREATE UNIQUE INDEX app_releases_pkey ON public.app_releases USING btree (id);

CREATE UNIQUE INDEX barcodes_pkey ON public.barcodes USING btree (id);

CREATE UNIQUE INDEX branch_settings_branch_id_key ON public.branch_settings USING btree (branch_id);

CREATE INDEX branch_settings_is_app_disabled_is_card_payment_disabled_is_idx ON public.branch_settings USING btree (is_app_disabled, is_card_payment_disabled, is_pay_on_delivery_disabled, is_pay_on_pickup_disabled, is_shipment_disabled, is_ordering_disabled);

CREATE UNIQUE INDEX branch_settings_pkey ON public.branch_settings USING btree (id);

CREATE UNIQUE INDEX cart_items_pkey ON public.cart_items USING btree (id);

CREATE UNIQUE INDEX categories_pkey ON public.categories USING btree (id);

CREATE UNIQUE INDEX customers_pkey ON public.customers USING btree (id);

CREATE UNIQUE INDEX customers_tax_id_key ON public.customers USING btree (tax_id);

CREATE UNIQUE INDEX delete_request_pkey ON public.delete_requests USING btree (id);

CREATE UNIQUE INDEX delete_request_request_number_key ON public.delete_requests USING btree (request_number);

CREATE INDEX idx_order_items_order_id ON public.order_items USING btree (order_id);

CREATE INDEX idx_order_items_product_id ON public.order_items USING btree (product_id);

CREATE INDEX idx_order_items_status ON public.order_items USING btree (status);

CREATE INDEX idx_wishlist_items_product_id ON public.wishlist_items USING btree (product_id);

CREATE INDEX idx_wishlist_items_user_id ON public.wishlist_items USING btree (customer_id);

CREATE UNIQUE INDEX newsletter_emails_email_key ON public.newsletter_emails USING btree (email);

CREATE UNIQUE INDEX newsletter_emails_pkey ON public.newsletter_emails USING btree (id);

CREATE UNIQUE INDEX order_items_pkey ON public.order_items USING btree (id);

CREATE UNIQUE INDEX order_payments_order_id_key ON public.order_payments USING btree (order_id);

CREATE UNIQUE INDEX order_payments_pkey ON public.order_payments USING btree (id);

CREATE UNIQUE INDEX order_shipping_order_id_key ON public.order_shipping USING btree (order_id);

CREATE UNIQUE INDEX order_shipping_pkey ON public.order_shipping USING btree (id);

CREATE INDEX orders_customer_id_idx ON public.orders USING btree (customer_id);

CREATE UNIQUE INDEX orders_order_number_key ON public.orders USING btree (order_number);

CREATE UNIQUE INDEX orders_pkey ON public.orders USING btree (id);

CREATE INDEX orders_status_idx ON public.orders USING btree (status);

CREATE UNIQUE INDEX payment_methods_pkey ON public.payment_methods USING btree (id);

CREATE UNIQUE INDEX product_images_pkey ON public.product_images USING btree (id);

CREATE INDEX product_images_product_id_idx ON public.product_images USING btree (product_id);

CREATE INDEX products_name_manufacturer_idx ON public.products USING btree (name, manufacturer);

CREATE UNIQUE INDEX products_pkey ON public.products USING btree (id);

CREATE UNIQUE INDEX unique_wishlist_id_product_id ON public.wishlist_items USING btree (customer_id, product_id);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

CREATE INDEX users_role_idx ON public.users USING btree (role);

CREATE UNIQUE INDEX wishlist_items_pkey ON public.wishlist_items USING btree (id);

alter table "public"."addresses" add constraint "addresses_pkey" PRIMARY KEY using index "addresses_pkey";

alter table "public"."app_releases" add constraint "app_releases_pkey" PRIMARY KEY using index "app_releases_pkey";

alter table "public"."barcodes" add constraint "barcodes_pkey" PRIMARY KEY using index "barcodes_pkey";

alter table "public"."branch_settings" add constraint "branch_settings_pkey" PRIMARY KEY using index "branch_settings_pkey";

alter table "public"."cart_items" add constraint "cart_items_pkey" PRIMARY KEY using index "cart_items_pkey";

alter table "public"."categories" add constraint "categories_pkey" PRIMARY KEY using index "categories_pkey";

alter table "public"."customers" add constraint "customers_pkey" PRIMARY KEY using index "customers_pkey";

alter table "public"."delete_requests" add constraint "delete_request_pkey" PRIMARY KEY using index "delete_request_pkey";

alter table "public"."newsletter_emails" add constraint "newsletter_emails_pkey" PRIMARY KEY using index "newsletter_emails_pkey";

alter table "public"."order_items" add constraint "order_items_pkey" PRIMARY KEY using index "order_items_pkey";

alter table "public"."order_payments" add constraint "order_payments_pkey" PRIMARY KEY using index "order_payments_pkey";

alter table "public"."order_shipping" add constraint "order_shipping_pkey" PRIMARY KEY using index "order_shipping_pkey";

alter table "public"."orders" add constraint "orders_pkey" PRIMARY KEY using index "orders_pkey";

alter table "public"."payment_methods" add constraint "payment_methods_pkey" PRIMARY KEY using index "payment_methods_pkey";

alter table "public"."product_images" add constraint "product_images_pkey" PRIMARY KEY using index "product_images_pkey";

alter table "public"."products" add constraint "products_pkey" PRIMARY KEY using index "products_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."wishlist_items" add constraint "wishlist_items_pkey" PRIMARY KEY using index "wishlist_items_pkey";

alter table "public"."addresses" add constraint "addresses_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES customers(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."addresses" validate constraint "addresses_customer_id_fkey";

alter table "public"."app_releases" add constraint "app_releases_branch_id_fkey" FOREIGN KEY (branch_id) REFERENCES branches(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."app_releases" validate constraint "app_releases_branch_id_fkey";

alter table "public"."barcodes" add constraint "barcodes_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."barcodes" validate constraint "barcodes_product_id_fkey";

alter table "public"."branch_settings" add constraint "branch_settings_branch_id_fkey" FOREIGN KEY (branch_id) REFERENCES branches(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."branch_settings" validate constraint "branch_settings_branch_id_fkey";

alter table "public"."branch_settings" add constraint "branch_settings_branch_id_key" UNIQUE using index "branch_settings_branch_id_key";

alter table "public"."cart_items" add constraint "cart_items_customer_Id_fkey" FOREIGN KEY (customer_id) REFERENCES customers(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."cart_items" validate constraint "cart_items_customer_Id_fkey";

alter table "public"."cart_items" add constraint "cart_items_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."cart_items" validate constraint "cart_items_product_id_fkey";

alter table "public"."categories" add constraint "categories_branch_id_fkey" FOREIGN KEY (branch_id) REFERENCES branches(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."categories" validate constraint "categories_branch_id_fkey";

alter table "public"."customers" add constraint "customers_branch_id_fkey" FOREIGN KEY (branch_id) REFERENCES branches(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."customers" validate constraint "customers_branch_id_fkey";

alter table "public"."customers" add constraint "customers_independent_sales_id_fkey" FOREIGN KEY (independent_sales_id) REFERENCES users(id) not valid;

alter table "public"."customers" validate constraint "customers_independent_sales_id_fkey";

alter table "public"."customers" add constraint "customers_tax_id_key" UNIQUE using index "customers_tax_id_key";

alter table "public"."delete_requests" add constraint "delete_request_branch_id_fkey" FOREIGN KEY (branch_id) REFERENCES branches(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."delete_requests" validate constraint "delete_request_branch_id_fkey";

alter table "public"."delete_requests" add constraint "delete_request_request_number_key" UNIQUE using index "delete_request_request_number_key";

alter table "public"."newsletter_emails" add constraint "newsletter_emails_branch_id_fkey" FOREIGN KEY (branch_id) REFERENCES branches(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."newsletter_emails" validate constraint "newsletter_emails_branch_id_fkey";

alter table "public"."newsletter_emails" add constraint "newsletter_emails_email_key" UNIQUE using index "newsletter_emails_email_key";

alter table "public"."order_items" add constraint "check_refunded_amount" CHECK ((refunded_amount <= (total_price)::double precision)) not valid;

alter table "public"."order_items" validate constraint "check_refunded_amount";

alter table "public"."order_items" add constraint "check_refunded_quantity" CHECK ((refunded_quantity <= quantity)) not valid;

alter table "public"."order_items" validate constraint "check_refunded_quantity";

alter table "public"."order_items" add constraint "order_items_discount_amount_check" CHECK ((discount_amount >= (0)::numeric)) not valid;

alter table "public"."order_items" validate constraint "order_items_discount_amount_check";

alter table "public"."order_items" add constraint "order_items_order_id_fkey1" FOREIGN KEY (order_id) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."order_items" validate constraint "order_items_order_id_fkey1";

alter table "public"."order_items" add constraint "order_items_product_id_fkey1" FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."order_items" validate constraint "order_items_product_id_fkey1";

alter table "public"."order_items" add constraint "order_items_quantity_check" CHECK ((quantity > 0)) not valid;

alter table "public"."order_items" validate constraint "order_items_quantity_check";

alter table "public"."order_items" add constraint "order_items_refunded_amount_check" CHECK ((refunded_amount >= ((0)::numeric)::double precision)) not valid;

alter table "public"."order_items" validate constraint "order_items_refunded_amount_check";

alter table "public"."order_items" add constraint "order_items_refunded_quantity_check" CHECK ((refunded_quantity >= 0)) not valid;

alter table "public"."order_items" validate constraint "order_items_refunded_quantity_check";

alter table "public"."order_items" add constraint "order_items_tax_amount_check" CHECK ((tax_amount >= (0)::numeric)) not valid;

alter table "public"."order_items" validate constraint "order_items_tax_amount_check";

alter table "public"."order_items" add constraint "order_items_total_price_check" CHECK ((total_price >= (0)::numeric)) not valid;

alter table "public"."order_items" validate constraint "order_items_total_price_check";

alter table "public"."order_items" add constraint "order_items_unit_price_check" CHECK ((unit_price >= (0)::numeric)) not valid;

alter table "public"."order_items" validate constraint "order_items_unit_price_check";

alter table "public"."order_payments" add constraint "order_payments_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."order_payments" validate constraint "order_payments_order_id_fkey";

alter table "public"."order_payments" add constraint "order_payments_order_id_key" UNIQUE using index "order_payments_order_id_key";

alter table "public"."order_payments" add constraint "order_payments_payment_method_id_fkey" FOREIGN KEY (payment_method_id) REFERENCES payment_methods(id) not valid;

alter table "public"."order_payments" validate constraint "order_payments_payment_method_id_fkey";

alter table "public"."order_shipping" add constraint "order_shipping_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."order_shipping" validate constraint "order_shipping_order_id_fkey";

alter table "public"."order_shipping" add constraint "order_shipping_order_id_key" UNIQUE using index "order_shipping_order_id_key";

alter table "public"."orders" add constraint "orders_branch_id_fkey" FOREIGN KEY (branch_id) REFERENCES branches(id) not valid;

alter table "public"."orders" validate constraint "orders_branch_id_fkey";

alter table "public"."orders" add constraint "orders_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES customers(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."orders" validate constraint "orders_customer_id_fkey";

alter table "public"."orders" add constraint "orders_delivery_address_id_fkey" FOREIGN KEY (delivery_address_id) REFERENCES addresses(id) ON UPDATE CASCADE not valid;

alter table "public"."orders" validate constraint "orders_delivery_address_id_fkey";

alter table "public"."orders" add constraint "orders_order_number_key" UNIQUE using index "orders_order_number_key";

alter table "public"."orders" add constraint "orders_salesperson_id_fkey" FOREIGN KEY (salesperson_id) REFERENCES users(id) not valid;

alter table "public"."orders" validate constraint "orders_salesperson_id_fkey";

alter table "public"."payment_methods" add constraint "payment_methods_billing_address_id_fkey" FOREIGN KEY (billing_address_id) REFERENCES addresses(id) not valid;

alter table "public"."payment_methods" validate constraint "payment_methods_billing_address_id_fkey";

alter table "public"."payment_methods" add constraint "payment_methods_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES customers(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."payment_methods" validate constraint "payment_methods_customer_id_fkey";

alter table "public"."product_images" add constraint "product_images_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."product_images" validate constraint "product_images_product_id_fkey";

alter table "public"."products" add constraint "products_branch_id_fkey" FOREIGN KEY (branch_id) REFERENCES branches(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."products" validate constraint "products_branch_id_fkey";

alter table "public"."products" add constraint "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES categories(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."products" validate constraint "products_categoryId_fkey";

alter table "public"."users" add constraint "users_branch_id_fkey" FOREIGN KEY (branch_id) REFERENCES branches(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."users" validate constraint "users_branch_id_fkey";

alter table "public"."wishlist_items" add constraint "unique_wishlist_id_product_id" UNIQUE using index "unique_wishlist_id_product_id";

alter table "public"."wishlist_items" add constraint "wishlist_items_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES customers(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."wishlist_items" validate constraint "wishlist_items_customer_id_fkey";

alter table "public"."wishlist_items" add constraint "wishlist_items_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."wishlist_items" validate constraint "wishlist_items_product_id_fkey";

set check_function_bodies = off;

create or replace view "public"."admin_users" as  SELECT users.id,
    users.role,
    users.first_name,
    users.last_name,
    users.admin_pin,
    users.blocked,
    users.created_at,
    users.updated_at,
    users.branch_id,
    users.email
   FROM users
  WHERE (users.role = 'admin'::user_role);


create or replace view "public"."approved_customers" as  SELECT customers.id,
    customers.created_at,
    customers.updated_at,
    customers.first_name,
    customers.last_name,
    customers.business_name,
    customers.phone,
    customers.tax_id,
    customers.tobacco_license,
    customers.approved,
    customers.approved_at,
    customers.blocked,
    customers.branch_id,
    customers.email,
    customers.opted_in_text,
    customers.customer_type,
    customers.belongs_to,
    customers.independent_sales_id
   FROM customers
  WHERE (customers.approved = true);


create or replace view "public"."belongs_independent_customers" as  SELECT customers.id,
    customers.created_at,
    customers.updated_at,
    customers.first_name,
    customers.last_name,
    customers.business_name,
    customers.phone,
    customers.tax_id,
    customers.tobacco_license,
    customers.approved,
    customers.approved_at,
    customers.blocked,
    customers.branch_id,
    customers.email,
    customers.opted_in_text,
    customers.customer_type,
    customers.belongs_to,
    customers.independent_sales_id
   FROM customers
  WHERE (customers.belongs_to = 'independent'::customer_belongs_to);


create or replace view "public"."belongs_wholesale_customers" as  SELECT customers.id,
    customers.created_at,
    customers.updated_at,
    customers.first_name,
    customers.last_name,
    customers.business_name,
    customers.phone,
    customers.tax_id,
    customers.tobacco_license,
    customers.approved,
    customers.approved_at,
    customers.blocked,
    customers.branch_id,
    customers.email,
    customers.opted_in_text,
    customers.customer_type,
    customers.belongs_to,
    customers.independent_sales_id
   FROM customers
  WHERE (customers.belongs_to = 'wholesale'::customer_belongs_to);


create or replace view "public"."billing_addresses" as  SELECT addresses.created_at,
    addresses.updated_at,
    addresses.type,
    addresses.street,
    addresses.city,
    addresses.state,
    addresses.zip_code,
    addresses.country,
    addresses.customer_id AS user_id,
    addresses.id
   FROM addresses
  WHERE (addresses.type = 'billing'::address_type);


CREATE OR REPLACE FUNCTION public.calculate_order_item_total_price()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.total_price = (NEW.quantity * NEW.unit_price) - NEW.discount_amount + NEW.tax_amount;
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.calculate_order_totals()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_order_id UUID;
BEGIN
    -- Set the order_id from the newly inserted or updated order_item
    v_order_id := NEW.order_id;

    -- Update the order's total_amount and total_quantity
    UPDATE orders
    SET total_amount = (
        SELECT COALESCE(SUM(total_price), 0)
        FROM order_items
        WHERE order_id = v_order_id AND status != 'returned'
    ),
    total_quantity = (
        SELECT COALESCE(SUM(quantity), 0)
        FROM order_items
        WHERE order_id = v_order_id AND status != 'returned'
    )
    WHERE id = v_order_id;

    RETURN NULL; -- result is ignored since this is an AFTER trigger
END;
$function$
;

CREATE OR REPLACE FUNCTION public.calculate_refunded_amount()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- Calculate the refunded amount based on the unit price and refunded quantity
    NEW.refunded_amount = NEW.refunded_quantity * NEW.unit_price;
    
    -- Ensure the refunded amount doesn't exceed the total price
    IF NEW.refunded_amount > NEW.total_price THEN
        NEW.refunded_amount = NEW.total_price;
    END IF;
    
    -- If there's a refund, set the status to 'returned'
    IF NEW.refunded_quantity > 0 THEN
        NEW.status = 'returned';
    END IF;
    
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.check_delivery_address_before_order()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$DECLARE
  v_address_type TEXT;
BEGIN
    SELECT type INTO v_address_type
    FROM addresses
    WHERE id = NEW.delivery_address_id;

    IF v_address_type != 'delivery' THEN
        RAISE EXCEPTION 'Must use a valid delivery address';
    END IF;

    RETURN NEW;
END;$function$
;

CREATE OR REPLACE FUNCTION public.check_user_role_before_order()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$DECLARE
    v_user_role TEXT;
BEGIN
    SELECT role INTO v_user_role 
    FROM users
    WHERE id = NEW.customer_id;

    IF v_user_role != 'customer' THEN
        RAISE EXCEPTION 'Associated user is not a customer';
    END IF;

    RETURN NEW;
END;$function$
;

create or replace view "public"."completed_orders" as  SELECT orders.id,
    orders.order_number,
    orders.type,
    orders.status,
    orders.updated_at,
    orders.created_at,
    orders.confirmed_at,
    orders.preparing_at,
    orders.ready_at,
    orders.completed_at,
    orders.cancelled_at,
    orders.refunded_at,
    orders.expected_delivery_at,
    orders.total_quantity,
    orders.total_amount,
    orders.customer_id,
    orders.branch_id,
    orders.delivery_address_id,
    orders.shipping_costs,
    orders.salesperson_id,
    orders.salesperson_customer_id
   FROM orders
  WHERE (orders.status = 'completed'::order_status);


create or replace view "public"."confirmed_orders" as  SELECT orders.id,
    orders.order_number,
    orders.type,
    orders.status,
    orders.updated_at,
    orders.created_at,
    orders.confirmed_at,
    orders.preparing_at,
    orders.ready_at,
    orders.completed_at,
    orders.cancelled_at,
    orders.refunded_at,
    orders.expected_delivery_at,
    orders.total_quantity,
    orders.total_amount,
    orders.customer_id,
    orders.branch_id,
    orders.delivery_address_id,
    orders.shipping_costs,
    orders.salesperson_id,
    orders.salesperson_customer_id
   FROM orders
  WHERE (orders.status = 'confirmed'::order_status);


CREATE OR REPLACE FUNCTION public.create_branch_settings()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  INSERT INTO branch_settings (
    branch_id
  ) VALUES (
    NEW.id
  );

  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_public_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  user_meta jsonb;
  user_role text;
BEGIN
  user_meta := NEW.raw_user_meta_data;
  user_role := (user_meta->>'role')::text;

  IF NEW.id IS NULL THEN
    NEW.id := gen_random_uuid(); -- This assumes you're using UUID for ids
  END IF;

  IF user_role IN ('admin', 'driver', 'sales', 'independent_sales') THEN
    -- Insert into public.users
    INSERT INTO public.users (
      id,
      email,
      first_name,
      last_name,
      branch_id,
      role
    ) VALUES (
      NEW.id,  
      NEW.email,
      (user_meta->>'first_name')::text,
      (user_meta->>'last_name')::text,
      (user_meta->>'branch_id')::uuid,
      (user_meta->>'role')::text::public.user_role
    );
  ELSE
    -- Insert into public.customers
    INSERT INTO public.customers (
      id,
      first_name,
      last_name,
      business_name,
      phone,
      branch_id,
      email,
      customer_type,
      opted_in_text
    ) VALUES (
      NEW.id,  
      (user_meta->>'first_name')::text,
      (user_meta->>'last_name')::text,
      (user_meta->>'business_name')::text,
      (user_meta->>'phone')::text,
      (user_meta->>'branch_id')::uuid,
      NEW.email,
      (user_meta->>'customer_type')::text::public.customer_type,
      false
    );
  END IF;

  RETURN NEW;
END;
$function$
;

create or replace view "public"."delivery_addresses" as  SELECT addresses.created_at,
    addresses.updated_at,
    addresses.type,
    addresses.street,
    addresses.city,
    addresses.state,
    addresses.zip_code,
    addresses.country,
    addresses.customer_id AS user_id,
    addresses.id
   FROM addresses
  WHERE (addresses.type = 'delivery'::address_type);


create or replace view "public"."discounted_products" as  SELECT products.id,
    products.created_at,
    products.updated_at,
    products.in_stock,
    products.hide,
    products.name,
    products.description,
    products.retail_price,
    products.wholesale_price,
    products.cost_price,
    products.discount,
    products.discounted_until,
    products.is_tobacco,
    products.unit,
    products.branch_id,
    products.manufacturer,
    products."categoryId",
    products.is_featured
   FROM products
  WHERE (products.discounted_until > CURRENT_DATE);


create or replace view "public"."featured_categories" as  SELECT categories.id,
    categories.created_at,
    categories.updated_at,
    categories.name,
    categories.description,
    categories.hide,
    categories.is_featured
   FROM categories
  WHERE (categories.is_featured = true);


create or replace view "public"."featured_products" as  SELECT products.id,
    products.created_at,
    products.updated_at,
    products.in_stock,
    products.hide,
    products.name,
    products.description,
    products.retail_price,
    products.wholesale_price,
    products.cost_price,
    products.discount,
    products.discounted_until,
    products.is_tobacco,
    products.unit,
    products.branch_id,
    products.manufacturer,
    products."categoryId",
    products.is_featured
   FROM products
  WHERE (products.is_featured = true);


CREATE OR REPLACE FUNCTION public.get_user_branch()
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  current_user_id uuid;
  user_branch_id uuid;
BEGIN
  current_user_id := auth.uid();
  
  SELECT branch_id INTO user_branch_id
  FROM users
  WHERE id = current_user_id;
  
  RETURN user_branch_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_order_item_return()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    IF NEW.status = 'returned' AND OLD.status != 'returned' THEN
        -- Update the associated product's in_stock status
        UPDATE products
        SET in_stock = FALSE
        WHERE id = NEW.product_id;
    
    END IF;
    
    RETURN NEW;
END;
$function$
;

create or replace view "public"."hidden_products" as  SELECT products.id,
    products.created_at,
    products.updated_at,
    products.in_stock,
    products.hide,
    products.name,
    products.description,
    products.retail_price,
    products.wholesale_price,
    products.cost_price,
    products.discount,
    products.discounted_until,
    products.is_tobacco,
    products.unit,
    products.branch_id,
    products.manufacturer,
    products."categoryId",
    products.is_featured
   FROM products
  WHERE (products.hide = true);


create or replace view "public"."in_stock_products" as  SELECT products.id,
    products.created_at,
    products.updated_at,
    products.in_stock,
    products.hide,
    products.name,
    products.description,
    products.retail_price,
    products.wholesale_price,
    products.cost_price,
    products.discount,
    products.discounted_until,
    products.is_tobacco,
    products.unit,
    products.branch_id,
    products.manufacturer,
    products."categoryId",
    products.is_featured
   FROM products
  WHERE (products.in_stock = true);


create or replace view "public"."independent_sales_users" as  SELECT users.id,
    users.role,
    users.first_name,
    users.last_name,
    users.admin_pin,
    users.blocked,
    users.created_at,
    users.updated_at,
    users.branch_id,
    users.email
   FROM users
  WHERE (users.role = 'independent_sales'::user_role);


create or replace view "public"."inhouse_sales_users" as  SELECT users.id,
    users.role,
    users.first_name,
    users.last_name,
    users.admin_pin,
    users.blocked,
    users.created_at,
    users.updated_at,
    users.branch_id,
    users.email
   FROM users
  WHERE (users.role = 'sales'::user_role);


CREATE OR REPLACE FUNCTION public.is_admin()
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  current_user_id uuid;
BEGIN
  current_user_id := auth.uid();
  
  RETURN EXISTS (
    SELECT 1
    FROM users
    WHERE id = current_user_id 
    AND role = 'admin'
  );
END;
$function$
;

CREATE OR REPLACE FUNCTION public.is_sales()
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  current_user_id uuid;
BEGIN
  current_user_id := auth.uid();
  
  RETURN EXISTS (
    SELECT 1
    FROM users
    WHERE id = current_user_id 
    AND role in ('sales', 'independent_sales')
  );
  
END;
$function$
;

create or replace view "public"."out_of_stock_products" as  SELECT products.id,
    products.created_at,
    products.updated_at,
    products.in_stock,
    products.hide,
    products.name,
    products.description,
    products.retail_price,
    products.wholesale_price,
    products.cost_price,
    products.discount,
    products.discounted_until,
    products.is_tobacco,
    products.unit,
    products.branch_id,
    products.manufacturer,
    products."categoryId",
    products.is_featured
   FROM products
  WHERE (products.in_stock = false);


create or replace view "public"."pending_orders" as  SELECT orders.id,
    orders.order_number,
    orders.type,
    orders.status,
    orders.updated_at,
    orders.created_at,
    orders.confirmed_at,
    orders.preparing_at,
    orders.ready_at,
    orders.completed_at,
    orders.cancelled_at,
    orders.refunded_at,
    orders.expected_delivery_at,
    orders.total_quantity,
    orders.total_amount,
    orders.customer_id,
    orders.branch_id,
    orders.delivery_address_id,
    orders.shipping_costs,
    orders.salesperson_id,
    orders.salesperson_customer_id
   FROM orders
  WHERE (orders.status = 'pending'::order_status);


create or replace view "public"."ready_orders" as  SELECT orders.id,
    orders.order_number,
    orders.type,
    orders.status,
    orders.updated_at,
    orders.created_at,
    orders.confirmed_at,
    orders.preparing_at,
    orders.ready_at,
    orders.completed_at,
    orders.cancelled_at,
    orders.refunded_at,
    orders.expected_delivery_at,
    orders.total_quantity,
    orders.total_amount,
    orders.customer_id,
    orders.branch_id,
    orders.delivery_address_id,
    orders.shipping_costs,
    orders.salesperson_id,
    orders.salesperson_customer_id
   FROM orders
  WHERE (orders.status = 'ready'::order_status);


create or replace view "public"."refunded_orders" as  SELECT orders.id,
    orders.order_number,
    orders.type,
    orders.status,
    orders.updated_at,
    orders.created_at,
    orders.confirmed_at,
    orders.preparing_at,
    orders.ready_at,
    orders.completed_at,
    orders.cancelled_at,
    orders.refunded_at,
    orders.expected_delivery_at,
    orders.total_quantity,
    orders.total_amount,
    orders.customer_id,
    orders.branch_id,
    orders.delivery_address_id,
    orders.shipping_costs,
    orders.salesperson_id,
    orders.salesperson_customer_id
   FROM orders
  WHERE (orders.status = 'refunded'::order_status);


create or replace view "public"."shown_products" as  SELECT products.id,
    products.created_at,
    products.updated_at,
    products.in_stock,
    products.hide,
    products.name,
    products.description,
    products.retail_price,
    products.wholesale_price,
    products.cost_price,
    products.discount,
    products.discounted_until,
    products.is_tobacco,
    products.unit,
    products.branch_id,
    products.manufacturer,
    products."categoryId",
    products.is_featured
   FROM products
  WHERE (products.hide = false);


create or replace view "public"."unapproved_customers" as  SELECT customers.id,
    customers.created_at,
    customers.updated_at,
    customers.first_name,
    customers.last_name,
    customers.business_name,
    customers.phone,
    customers.tax_id,
    customers.tobacco_license,
    customers.approved,
    customers.approved_at,
    customers.blocked,
    customers.branch_id,
    customers.email,
    customers.opted_in_text,
    customers.customer_type,
    customers.belongs_to,
    customers.independent_sales_id
   FROM customers
  WHERE (customers.approved = false);


CREATE OR REPLACE FUNCTION public.update_auth_user_metadata()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  -- Update the auth.users table
  UPDATE auth.users
  SET raw_user_meta_data = raw_user_meta_data || to_jsonb(NEW.*)
  WHERE id = NEW.id::uuid;
  
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_order_status_timestamp()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
    IF NEW.status = 'confirmed' THEN
        NEW.confirmed_at = NOW();
    ELSIF NEW.status = 'preparing' THEN
        NEW.preparing_at = NOW();
    ELSIF NEW.status = 'ready' THEN
        NEW.ready_at = NOW();
    ELSIF NEW.status = 'completed' THEN
        NEW.completed_at = NOW();
    ELSIF NEW.status = 'cancelled' THEN
        NEW.cancelled_at = NOW();
    ELSIF NEW.status = 'refunded' THEN
        NEW.refunded_at = NOW();
    END IF;
    RETURN NEW;
END;$function$
;

CREATE OR REPLACE FUNCTION public.update_user_approved_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  -- Only update approved_at if approved field has changed to true
  IF (OLD.approved IS DISTINCT FROM NEW.approved) AND NEW.approved = true THEN
    NEW.approved_at = current_timestamp;
  END IF;

  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.verify_order_standards()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
    v_delivery_minimum NUMERIC;
    v_pickup_minimum NUMERIC;
    v_shipment_minimum NUMERIC;
BEGIN
    -- Set the search path explicitly for security
    SET search_path TO public, pg_temp;

    -- Fetch the minimum values for the branch
    SELECT delivery_minimum, pickup_minimum, shipment_minimum
    INTO v_delivery_minimum, v_pickup_minimum, v_shipment_minimum
    FROM branch_settings
    WHERE branch_id = NEW.branch_id;

    -- Check minimums based on order type
    CASE NEW.type
        WHEN 'delivery' THEN
            IF NEW.total_amount < v_delivery_minimum THEN
                RAISE EXCEPTION 'Delivery does not meet minimum amount of %', v_delivery_minimum;
            END IF;
        WHEN 'pickup' THEN
            IF NEW.total_amount < v_pickup_minimum THEN
                RAISE EXCEPTION 'Pickup does not meet minimum amount of %', v_pickup_minimum;
            END IF;
        WHEN 'shipment' THEN
            IF NEW.total_amount < v_shipment_minimum THEN
                RAISE EXCEPTION 'Shipment does not meet minimum amount of %', v_shipment_minimum;
            END IF;
    END CASE;

    RETURN NEW;
END;
$function$
;

grant delete on table "public"."addresses" to "anon";

grant insert on table "public"."addresses" to "anon";

grant references on table "public"."addresses" to "anon";

grant select on table "public"."addresses" to "anon";

grant trigger on table "public"."addresses" to "anon";

grant truncate on table "public"."addresses" to "anon";

grant update on table "public"."addresses" to "anon";

grant delete on table "public"."addresses" to "authenticated";

grant insert on table "public"."addresses" to "authenticated";

grant references on table "public"."addresses" to "authenticated";

grant select on table "public"."addresses" to "authenticated";

grant trigger on table "public"."addresses" to "authenticated";

grant truncate on table "public"."addresses" to "authenticated";

grant update on table "public"."addresses" to "authenticated";

grant delete on table "public"."addresses" to "service_role";

grant insert on table "public"."addresses" to "service_role";

grant references on table "public"."addresses" to "service_role";

grant select on table "public"."addresses" to "service_role";

grant trigger on table "public"."addresses" to "service_role";

grant truncate on table "public"."addresses" to "service_role";

grant update on table "public"."addresses" to "service_role";

grant delete on table "public"."app_releases" to "anon";

grant insert on table "public"."app_releases" to "anon";

grant references on table "public"."app_releases" to "anon";

grant select on table "public"."app_releases" to "anon";

grant trigger on table "public"."app_releases" to "anon";

grant truncate on table "public"."app_releases" to "anon";

grant update on table "public"."app_releases" to "anon";

grant delete on table "public"."app_releases" to "authenticated";

grant insert on table "public"."app_releases" to "authenticated";

grant references on table "public"."app_releases" to "authenticated";

grant select on table "public"."app_releases" to "authenticated";

grant trigger on table "public"."app_releases" to "authenticated";

grant truncate on table "public"."app_releases" to "authenticated";

grant update on table "public"."app_releases" to "authenticated";

grant delete on table "public"."app_releases" to "service_role";

grant insert on table "public"."app_releases" to "service_role";

grant references on table "public"."app_releases" to "service_role";

grant select on table "public"."app_releases" to "service_role";

grant trigger on table "public"."app_releases" to "service_role";

grant truncate on table "public"."app_releases" to "service_role";

grant update on table "public"."app_releases" to "service_role";

grant delete on table "public"."barcodes" to "anon";

grant insert on table "public"."barcodes" to "anon";

grant references on table "public"."barcodes" to "anon";

grant select on table "public"."barcodes" to "anon";

grant trigger on table "public"."barcodes" to "anon";

grant truncate on table "public"."barcodes" to "anon";

grant update on table "public"."barcodes" to "anon";

grant delete on table "public"."barcodes" to "authenticated";

grant insert on table "public"."barcodes" to "authenticated";

grant references on table "public"."barcodes" to "authenticated";

grant select on table "public"."barcodes" to "authenticated";

grant trigger on table "public"."barcodes" to "authenticated";

grant truncate on table "public"."barcodes" to "authenticated";

grant update on table "public"."barcodes" to "authenticated";

grant delete on table "public"."barcodes" to "service_role";

grant insert on table "public"."barcodes" to "service_role";

grant references on table "public"."barcodes" to "service_role";

grant select on table "public"."barcodes" to "service_role";

grant trigger on table "public"."barcodes" to "service_role";

grant truncate on table "public"."barcodes" to "service_role";

grant update on table "public"."barcodes" to "service_role";

grant delete on table "public"."branch_settings" to "anon";

grant insert on table "public"."branch_settings" to "anon";

grant references on table "public"."branch_settings" to "anon";

grant select on table "public"."branch_settings" to "anon";

grant trigger on table "public"."branch_settings" to "anon";

grant truncate on table "public"."branch_settings" to "anon";

grant update on table "public"."branch_settings" to "anon";

grant delete on table "public"."branch_settings" to "authenticated";

grant insert on table "public"."branch_settings" to "authenticated";

grant references on table "public"."branch_settings" to "authenticated";

grant select on table "public"."branch_settings" to "authenticated";

grant trigger on table "public"."branch_settings" to "authenticated";

grant truncate on table "public"."branch_settings" to "authenticated";

grant update on table "public"."branch_settings" to "authenticated";

grant delete on table "public"."branch_settings" to "service_role";

grant insert on table "public"."branch_settings" to "service_role";

grant references on table "public"."branch_settings" to "service_role";

grant select on table "public"."branch_settings" to "service_role";

grant trigger on table "public"."branch_settings" to "service_role";

grant truncate on table "public"."branch_settings" to "service_role";

grant update on table "public"."branch_settings" to "service_role";

grant delete on table "public"."cart_items" to "anon";

grant insert on table "public"."cart_items" to "anon";

grant references on table "public"."cart_items" to "anon";

grant select on table "public"."cart_items" to "anon";

grant trigger on table "public"."cart_items" to "anon";

grant truncate on table "public"."cart_items" to "anon";

grant update on table "public"."cart_items" to "anon";

grant delete on table "public"."cart_items" to "authenticated";

grant insert on table "public"."cart_items" to "authenticated";

grant references on table "public"."cart_items" to "authenticated";

grant select on table "public"."cart_items" to "authenticated";

grant trigger on table "public"."cart_items" to "authenticated";

grant truncate on table "public"."cart_items" to "authenticated";

grant update on table "public"."cart_items" to "authenticated";

grant delete on table "public"."cart_items" to "service_role";

grant insert on table "public"."cart_items" to "service_role";

grant references on table "public"."cart_items" to "service_role";

grant select on table "public"."cart_items" to "service_role";

grant trigger on table "public"."cart_items" to "service_role";

grant truncate on table "public"."cart_items" to "service_role";

grant update on table "public"."cart_items" to "service_role";

grant delete on table "public"."categories" to "anon";

grant insert on table "public"."categories" to "anon";

grant references on table "public"."categories" to "anon";

grant select on table "public"."categories" to "anon";

grant trigger on table "public"."categories" to "anon";

grant truncate on table "public"."categories" to "anon";

grant update on table "public"."categories" to "anon";

grant delete on table "public"."categories" to "authenticated";

grant insert on table "public"."categories" to "authenticated";

grant references on table "public"."categories" to "authenticated";

grant select on table "public"."categories" to "authenticated";

grant trigger on table "public"."categories" to "authenticated";

grant truncate on table "public"."categories" to "authenticated";

grant update on table "public"."categories" to "authenticated";

grant delete on table "public"."categories" to "service_role";

grant insert on table "public"."categories" to "service_role";

grant references on table "public"."categories" to "service_role";

grant select on table "public"."categories" to "service_role";

grant trigger on table "public"."categories" to "service_role";

grant truncate on table "public"."categories" to "service_role";

grant update on table "public"."categories" to "service_role";

grant delete on table "public"."customers" to "anon";

grant insert on table "public"."customers" to "anon";

grant references on table "public"."customers" to "anon";

grant select on table "public"."customers" to "anon";

grant trigger on table "public"."customers" to "anon";

grant truncate on table "public"."customers" to "anon";

grant update on table "public"."customers" to "anon";

grant delete on table "public"."customers" to "authenticated";

grant insert on table "public"."customers" to "authenticated";

grant references on table "public"."customers" to "authenticated";

grant select on table "public"."customers" to "authenticated";

grant trigger on table "public"."customers" to "authenticated";

grant truncate on table "public"."customers" to "authenticated";

grant update on table "public"."customers" to "authenticated";

grant delete on table "public"."customers" to "service_role";

grant insert on table "public"."customers" to "service_role";

grant references on table "public"."customers" to "service_role";

grant select on table "public"."customers" to "service_role";

grant trigger on table "public"."customers" to "service_role";

grant truncate on table "public"."customers" to "service_role";

grant update on table "public"."customers" to "service_role";

grant delete on table "public"."delete_requests" to "anon";

grant insert on table "public"."delete_requests" to "anon";

grant references on table "public"."delete_requests" to "anon";

grant select on table "public"."delete_requests" to "anon";

grant trigger on table "public"."delete_requests" to "anon";

grant truncate on table "public"."delete_requests" to "anon";

grant update on table "public"."delete_requests" to "anon";

grant delete on table "public"."delete_requests" to "authenticated";

grant insert on table "public"."delete_requests" to "authenticated";

grant references on table "public"."delete_requests" to "authenticated";

grant select on table "public"."delete_requests" to "authenticated";

grant trigger on table "public"."delete_requests" to "authenticated";

grant truncate on table "public"."delete_requests" to "authenticated";

grant update on table "public"."delete_requests" to "authenticated";

grant delete on table "public"."delete_requests" to "service_role";

grant insert on table "public"."delete_requests" to "service_role";

grant references on table "public"."delete_requests" to "service_role";

grant select on table "public"."delete_requests" to "service_role";

grant trigger on table "public"."delete_requests" to "service_role";

grant truncate on table "public"."delete_requests" to "service_role";

grant update on table "public"."delete_requests" to "service_role";

grant delete on table "public"."newsletter_emails" to "anon";

grant insert on table "public"."newsletter_emails" to "anon";

grant references on table "public"."newsletter_emails" to "anon";

grant select on table "public"."newsletter_emails" to "anon";

grant trigger on table "public"."newsletter_emails" to "anon";

grant truncate on table "public"."newsletter_emails" to "anon";

grant update on table "public"."newsletter_emails" to "anon";

grant delete on table "public"."newsletter_emails" to "authenticated";

grant insert on table "public"."newsletter_emails" to "authenticated";

grant references on table "public"."newsletter_emails" to "authenticated";

grant select on table "public"."newsletter_emails" to "authenticated";

grant trigger on table "public"."newsletter_emails" to "authenticated";

grant truncate on table "public"."newsletter_emails" to "authenticated";

grant update on table "public"."newsletter_emails" to "authenticated";

grant delete on table "public"."newsletter_emails" to "service_role";

grant insert on table "public"."newsletter_emails" to "service_role";

grant references on table "public"."newsletter_emails" to "service_role";

grant select on table "public"."newsletter_emails" to "service_role";

grant trigger on table "public"."newsletter_emails" to "service_role";

grant truncate on table "public"."newsletter_emails" to "service_role";

grant update on table "public"."newsletter_emails" to "service_role";

grant delete on table "public"."order_items" to "anon";

grant insert on table "public"."order_items" to "anon";

grant references on table "public"."order_items" to "anon";

grant select on table "public"."order_items" to "anon";

grant trigger on table "public"."order_items" to "anon";

grant truncate on table "public"."order_items" to "anon";

grant update on table "public"."order_items" to "anon";

grant delete on table "public"."order_items" to "authenticated";

grant insert on table "public"."order_items" to "authenticated";

grant references on table "public"."order_items" to "authenticated";

grant select on table "public"."order_items" to "authenticated";

grant trigger on table "public"."order_items" to "authenticated";

grant truncate on table "public"."order_items" to "authenticated";

grant update on table "public"."order_items" to "authenticated";

grant delete on table "public"."order_items" to "service_role";

grant insert on table "public"."order_items" to "service_role";

grant references on table "public"."order_items" to "service_role";

grant select on table "public"."order_items" to "service_role";

grant trigger on table "public"."order_items" to "service_role";

grant truncate on table "public"."order_items" to "service_role";

grant update on table "public"."order_items" to "service_role";

grant delete on table "public"."order_payments" to "anon";

grant insert on table "public"."order_payments" to "anon";

grant references on table "public"."order_payments" to "anon";

grant select on table "public"."order_payments" to "anon";

grant trigger on table "public"."order_payments" to "anon";

grant truncate on table "public"."order_payments" to "anon";

grant update on table "public"."order_payments" to "anon";

grant delete on table "public"."order_payments" to "authenticated";

grant insert on table "public"."order_payments" to "authenticated";

grant references on table "public"."order_payments" to "authenticated";

grant select on table "public"."order_payments" to "authenticated";

grant trigger on table "public"."order_payments" to "authenticated";

grant truncate on table "public"."order_payments" to "authenticated";

grant update on table "public"."order_payments" to "authenticated";

grant delete on table "public"."order_payments" to "service_role";

grant insert on table "public"."order_payments" to "service_role";

grant references on table "public"."order_payments" to "service_role";

grant select on table "public"."order_payments" to "service_role";

grant trigger on table "public"."order_payments" to "service_role";

grant truncate on table "public"."order_payments" to "service_role";

grant update on table "public"."order_payments" to "service_role";

grant delete on table "public"."order_shipping" to "anon";

grant insert on table "public"."order_shipping" to "anon";

grant references on table "public"."order_shipping" to "anon";

grant select on table "public"."order_shipping" to "anon";

grant trigger on table "public"."order_shipping" to "anon";

grant truncate on table "public"."order_shipping" to "anon";

grant update on table "public"."order_shipping" to "anon";

grant delete on table "public"."order_shipping" to "authenticated";

grant insert on table "public"."order_shipping" to "authenticated";

grant references on table "public"."order_shipping" to "authenticated";

grant select on table "public"."order_shipping" to "authenticated";

grant trigger on table "public"."order_shipping" to "authenticated";

grant truncate on table "public"."order_shipping" to "authenticated";

grant update on table "public"."order_shipping" to "authenticated";

grant delete on table "public"."order_shipping" to "service_role";

grant insert on table "public"."order_shipping" to "service_role";

grant references on table "public"."order_shipping" to "service_role";

grant select on table "public"."order_shipping" to "service_role";

grant trigger on table "public"."order_shipping" to "service_role";

grant truncate on table "public"."order_shipping" to "service_role";

grant update on table "public"."order_shipping" to "service_role";

grant delete on table "public"."orders" to "anon";

grant insert on table "public"."orders" to "anon";

grant references on table "public"."orders" to "anon";

grant select on table "public"."orders" to "anon";

grant trigger on table "public"."orders" to "anon";

grant truncate on table "public"."orders" to "anon";

grant update on table "public"."orders" to "anon";

grant delete on table "public"."orders" to "authenticated";

grant insert on table "public"."orders" to "authenticated";

grant references on table "public"."orders" to "authenticated";

grant select on table "public"."orders" to "authenticated";

grant trigger on table "public"."orders" to "authenticated";

grant truncate on table "public"."orders" to "authenticated";

grant update on table "public"."orders" to "authenticated";

grant delete on table "public"."orders" to "service_role";

grant insert on table "public"."orders" to "service_role";

grant references on table "public"."orders" to "service_role";

grant select on table "public"."orders" to "service_role";

grant trigger on table "public"."orders" to "service_role";

grant truncate on table "public"."orders" to "service_role";

grant update on table "public"."orders" to "service_role";

grant delete on table "public"."payment_methods" to "anon";

grant insert on table "public"."payment_methods" to "anon";

grant references on table "public"."payment_methods" to "anon";

grant select on table "public"."payment_methods" to "anon";

grant trigger on table "public"."payment_methods" to "anon";

grant truncate on table "public"."payment_methods" to "anon";

grant update on table "public"."payment_methods" to "anon";

grant delete on table "public"."payment_methods" to "authenticated";

grant insert on table "public"."payment_methods" to "authenticated";

grant references on table "public"."payment_methods" to "authenticated";

grant select on table "public"."payment_methods" to "authenticated";

grant trigger on table "public"."payment_methods" to "authenticated";

grant truncate on table "public"."payment_methods" to "authenticated";

grant update on table "public"."payment_methods" to "authenticated";

grant delete on table "public"."payment_methods" to "service_role";

grant insert on table "public"."payment_methods" to "service_role";

grant references on table "public"."payment_methods" to "service_role";

grant select on table "public"."payment_methods" to "service_role";

grant trigger on table "public"."payment_methods" to "service_role";

grant truncate on table "public"."payment_methods" to "service_role";

grant update on table "public"."payment_methods" to "service_role";

grant delete on table "public"."product_images" to "anon";

grant insert on table "public"."product_images" to "anon";

grant references on table "public"."product_images" to "anon";

grant select on table "public"."product_images" to "anon";

grant trigger on table "public"."product_images" to "anon";

grant truncate on table "public"."product_images" to "anon";

grant update on table "public"."product_images" to "anon";

grant delete on table "public"."product_images" to "authenticated";

grant insert on table "public"."product_images" to "authenticated";

grant references on table "public"."product_images" to "authenticated";

grant select on table "public"."product_images" to "authenticated";

grant trigger on table "public"."product_images" to "authenticated";

grant truncate on table "public"."product_images" to "authenticated";

grant update on table "public"."product_images" to "authenticated";

grant delete on table "public"."product_images" to "service_role";

grant insert on table "public"."product_images" to "service_role";

grant references on table "public"."product_images" to "service_role";

grant select on table "public"."product_images" to "service_role";

grant trigger on table "public"."product_images" to "service_role";

grant truncate on table "public"."product_images" to "service_role";

grant update on table "public"."product_images" to "service_role";

grant delete on table "public"."products" to "anon";

grant insert on table "public"."products" to "anon";

grant references on table "public"."products" to "anon";

grant select on table "public"."products" to "anon";

grant trigger on table "public"."products" to "anon";

grant truncate on table "public"."products" to "anon";

grant update on table "public"."products" to "anon";

grant delete on table "public"."products" to "authenticated";

grant insert on table "public"."products" to "authenticated";

grant references on table "public"."products" to "authenticated";

grant select on table "public"."products" to "authenticated";

grant trigger on table "public"."products" to "authenticated";

grant truncate on table "public"."products" to "authenticated";

grant update on table "public"."products" to "authenticated";

grant delete on table "public"."products" to "service_role";

grant insert on table "public"."products" to "service_role";

grant references on table "public"."products" to "service_role";

grant select on table "public"."products" to "service_role";

grant trigger on table "public"."products" to "service_role";

grant truncate on table "public"."products" to "service_role";

grant update on table "public"."products" to "service_role";

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";

grant delete on table "public"."wishlist_items" to "anon";

grant insert on table "public"."wishlist_items" to "anon";

grant references on table "public"."wishlist_items" to "anon";

grant select on table "public"."wishlist_items" to "anon";

grant trigger on table "public"."wishlist_items" to "anon";

grant truncate on table "public"."wishlist_items" to "anon";

grant update on table "public"."wishlist_items" to "anon";

grant delete on table "public"."wishlist_items" to "authenticated";

grant insert on table "public"."wishlist_items" to "authenticated";

grant references on table "public"."wishlist_items" to "authenticated";

grant select on table "public"."wishlist_items" to "authenticated";

grant trigger on table "public"."wishlist_items" to "authenticated";

grant truncate on table "public"."wishlist_items" to "authenticated";

grant update on table "public"."wishlist_items" to "authenticated";

grant delete on table "public"."wishlist_items" to "service_role";

grant insert on table "public"."wishlist_items" to "service_role";

grant references on table "public"."wishlist_items" to "service_role";

grant select on table "public"."wishlist_items" to "service_role";

grant trigger on table "public"."wishlist_items" to "service_role";

grant truncate on table "public"."wishlist_items" to "service_role";

grant update on table "public"."wishlist_items" to "service_role";

create policy "Enable actions for users based on user_id"
on "public"."addresses"
as permissive
for all
to public
using ((( SELECT auth.uid() AS uid) = customer_id));


create policy "enable select for all"
on "public"."app_releases"
as permissive
for select
to public
using (true);


create policy "disable update for all users"
on "public"."barcodes"
as permissive
for update
to public
using (false);


create policy "enable delete for admins"
on "public"."barcodes"
as permissive
for delete
to authenticated
using (is_admin());


create policy "enable insert for admins"
on "public"."barcodes"
as permissive
for insert
to authenticated
with check (is_admin());


create policy "enable read for all users"
on "public"."barcodes"
as permissive
for select
to public
using (true);


create policy "disable delete for all users"
on "public"."branch_settings"
as permissive
for delete
to public
using (false);


create policy "enable insert for postgres"
on "public"."branch_settings"
as permissive
for insert
to postgres
with check (true);


create policy "enable read for all users"
on "public"."branch_settings"
as permissive
for select
to public
using (true);


create policy "enable update for admins"
on "public"."branch_settings"
as permissive
for update
to authenticated
using (is_admin())
with check (is_admin());


create policy "enable delete for postgres only"
on "public"."branches"
as permissive
for delete
to postgres
using (true);


create policy "enable insert for postgres"
on "public"."branches"
as permissive
for insert
to postgres
with check (true);


create policy "enable read for all users"
on "public"."branches"
as permissive
for select
to public
using (true);


create policy "enable update for admins"
on "public"."branches"
as permissive
for update
to authenticated
using (is_admin())
with check (is_admin());


create policy "Enable users to view their own data only"
on "public"."cart_items"
as permissive
for all
to authenticated
using ((( SELECT auth.uid() AS uid) = customer_id))
with check ((( SELECT auth.uid() AS uid) = customer_id));


create policy "Enable read access for all users"
on "public"."categories"
as permissive
for select
to public
using (true);


create policy "enable delete for admins in their branch"
on "public"."categories"
as permissive
for delete
to public
using ((is_admin() AND (branch_id = get_user_branch())));


create policy "enable insert for admins in their branch"
on "public"."categories"
as permissive
for insert
to authenticated
with check ((is_admin() AND (branch_id = get_user_branch())));


create policy "enable update for admins in their branch"
on "public"."categories"
as permissive
for update
to authenticated
using ((is_admin() AND (branch_id = get_user_branch())))
with check ((is_admin() AND (branch_id = get_user_branch())));


create policy "enable delete for postgres only"
on "public"."customers"
as permissive
for delete
to postgres
using (true);


create policy "enable insert for admins or sales in their branch"
on "public"."customers"
as permissive
for insert
to authenticated
with check (((branch_id = get_user_branch()) AND (is_sales() OR is_admin())));


create policy "enable select for admins"
on "public"."customers"
as permissive
for select
to public
using ((is_admin() AND (branch_id = get_user_branch())));


create policy "enable select for customer's own records"
on "public"."customers"
as permissive
for select
to authenticated
using ((auth.uid() = id));


create policy "enable select for sales users"
on "public"."customers"
as permissive
for select
to authenticated
using ((is_sales() AND (branch_id = get_user_branch())));


create policy "enable update for admins in their branch"
on "public"."customers"
as permissive
for update
to authenticated
using ((is_admin() AND (branch_id = get_user_branch())))
with check ((is_admin() AND (branch_id = get_user_branch())));


create policy "enable insert to all users"
on "public"."delete_requests"
as permissive
for insert
to public
with check (true);


create policy "enable insert for all users"
on "public"."newsletter_emails"
as permissive
for insert
to public
with check (true);


create policy "enable insert for admins"
on "public"."order_items"
as permissive
for insert
to authenticated
with check (is_admin());


create policy "enable insert for customers"
on "public"."order_items"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM customers
  WHERE (customers.id = auth.uid()))));


create policy "enable insert for sales"
on "public"."order_items"
as permissive
for insert
to authenticated
with check (is_sales());


create policy "enable select for admin"
on "public"."order_items"
as permissive
for select
to public
using (is_admin());


create policy "enable update for admins"
on "public"."order_items"
as permissive
for select
to authenticated
using (is_admin());


create policy "enable insert for admins"
on "public"."order_payments"
as permissive
for insert
to authenticated
with check (is_admin());


create policy "enable insert for users own data"
on "public"."order_payments"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM orders
  WHERE ((orders.id = order_payments.order_id) AND (orders.customer_id = auth.uid())))));


create policy "enable select for admins"
on "public"."order_payments"
as permissive
for select
to authenticated
using (is_admin());


create policy "enable select for sales"
on "public"."order_payments"
as permissive
for select
to authenticated
using (is_sales());


create policy "enable update for admins"
on "public"."order_payments"
as permissive
for update
to authenticated
using (is_admin())
with check (is_admin());


create policy "enable insert for admins"
on "public"."order_shipping"
as permissive
for insert
to authenticated
with check (is_admin());


create policy "enable select for admins"
on "public"."order_shipping"
as permissive
for select
to authenticated
using (is_admin());


create policy "enable select for sales"
on "public"."order_shipping"
as permissive
for select
to authenticated
using (is_sales());


create policy "enable update for admins"
on "public"."order_shipping"
as permissive
for update
to authenticated
using (is_admin())
with check (is_admin());


create policy "delete only for postgres"
on "public"."orders"
as permissive
for delete
to postgres
using (true);


create policy "enable insert by admins"
on "public"."orders"
as permissive
for insert
to public
with check (is_admin());


create policy "enable insert by customers"
on "public"."orders"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM customers
  WHERE (customers.id = auth.uid()))));


create policy "enable insert by sales"
on "public"."orders"
as permissive
for insert
to public
with check (is_sales());


create policy "enable select for admins"
on "public"."orders"
as permissive
for select
to authenticated
using (is_admin());


create policy "enable select for sales"
on "public"."orders"
as permissive
for select
to authenticated
using (is_sales());


create policy "enable update for admins"
on "public"."orders"
as permissive
for update
to authenticated
using (is_admin())
with check (is_admin());


create policy "enable all actions for customer's own records"
on "public"."payment_methods"
as permissive
for all
to authenticated
using ((auth.uid() = customer_id))
with check ((auth.uid() = customer_id));


create policy "enable select for admins"
on "public"."payment_methods"
as permissive
for select
to authenticated
using (is_admin());


create policy "enable delete for admins"
on "public"."product_images"
as permissive
for delete
to authenticated
using (is_admin());


create policy "enable insert for admins"
on "public"."product_images"
as permissive
for insert
to authenticated
with check (is_admin());


create policy "enable select for all"
on "public"."product_images"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."products"
as permissive
for select
to public
using (true);


create policy "enable all for admins"
on "public"."products"
as permissive
for all
to authenticated
using (is_admin())
with check (is_admin());


create policy "enable all for admins"
on "public"."users"
as permissive
for all
to authenticated
using (is_admin())
with check (is_admin());


create policy "Enable users to view their own data only"
on "public"."wishlist_items"
as permissive
for all
to authenticated
using ((( SELECT auth.uid() AS uid) = customer_id))
with check ((( SELECT auth.uid() AS uid) = customer_id));


CREATE TRIGGER address_updated_at BEFORE UPDATE ON public.addresses FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER branch_settings_updated_at BEFORE UPDATE ON public.branch_settings FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER branch_updated_at BEFORE UPDATE ON public.branches FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER init_branch_settings_trigger AFTER INSERT ON public.branches FOR EACH ROW EXECUTE FUNCTION create_branch_settings();

CREATE TRIGGER category_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER customer_updated_at BEFORE UPDATE ON public.customers FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_auth_user_metadata_trigger AFTER INSERT OR UPDATE ON public.customers FOR EACH ROW EXECUTE FUNCTION update_auth_user_metadata();

CREATE TRIGGER update_user_approved_at_trigger BEFORE UPDATE OF approved ON public.customers FOR EACH ROW WHEN ((old.approved IS DISTINCT FROM new.approved)) EXECUTE FUNCTION update_user_approved_at();

CREATE TRIGGER newsletter_email_updated_at BEFORE UPDATE ON public.newsletter_emails FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER calculate_order_items_refunded_amount BEFORE INSERT OR UPDATE OF refunded_quantity, unit_price ON public.order_items FOR EACH ROW EXECUTE FUNCTION calculate_refunded_amount();

CREATE TRIGGER calculate_order_items_total_price BEFORE INSERT OR UPDATE OF quantity, unit_price, discount_amount, tax_amount ON public.order_items FOR EACH ROW EXECUTE FUNCTION calculate_order_item_total_price();

CREATE TRIGGER calculate_order_totals_insert AFTER INSERT ON public.order_items FOR EACH ROW EXECUTE FUNCTION calculate_order_totals();

CREATE TRIGGER calculate_order_totals_update AFTER UPDATE ON public.order_items FOR EACH ROW WHEN (((old.quantity IS DISTINCT FROM new.quantity) OR (old.total_price IS DISTINCT FROM new.total_price) OR (old.status IS DISTINCT FROM new.status))) EXECUTE FUNCTION calculate_order_totals();

CREATE TRIGGER handle_order_item_return_trigger AFTER UPDATE OF status ON public.order_items FOR EACH ROW WHEN (((new.status = 'returned'::order_item_status) AND (old.status <> 'returned'::order_item_status))) EXECUTE FUNCTION handle_order_item_return();

CREATE TRIGGER order_items_updated_at BEFORE UPDATE ON public.order_items FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER check_delivery_address_before_order_trigger BEFORE INSERT ON public.orders FOR EACH ROW EXECUTE FUNCTION check_delivery_address_before_order();

CREATE TRIGGER check_user_role_before_order_trigger BEFORE INSERT ON public.orders FOR EACH ROW EXECUTE FUNCTION check_user_role_before_order();

CREATE TRIGGER order_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_order_status_trigger BEFORE UPDATE ON public.orders FOR EACH ROW WHEN ((old.status IS DISTINCT FROM new.status)) EXECUTE FUNCTION update_order_status_timestamp();

CREATE TRIGGER verify_order_standards_trigger BEFORE INSERT ON public.orders FOR EACH ROW EXECUTE FUNCTION verify_order_standards();

CREATE TRIGGER product_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_auth_user_metadata_trigger AFTER INSERT OR UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_auth_user_metadata();

CREATE TRIGGER user_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_modified_column();


