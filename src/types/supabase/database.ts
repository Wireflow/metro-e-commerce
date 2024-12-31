export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      addresses: {
        Row: {
          city: string;
          country: string;
          created_at: string;
          customer_id: string;
          id: string;
          name: string | null;
          state: string;
          street: string;
          type: Database['public']['Enums']['address_type'];
          updated_at: string;
          zip_code: string;
        };
        Insert: {
          city: string;
          country?: string;
          created_at?: string;
          customer_id: string;
          id?: string;
          name?: string | null;
          state: string;
          street: string;
          type: Database['public']['Enums']['address_type'];
          updated_at?: string;
          zip_code: string;
        };
        Update: {
          city?: string;
          country?: string;
          created_at?: string;
          customer_id?: string;
          id?: string;
          name?: string | null;
          state?: string;
          street?: string;
          type?: Database['public']['Enums']['address_type'];
          updated_at?: string;
          zip_code?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'addresses_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'approved_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'addresses_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'belongs_independent_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'addresses_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'belongs_wholesale_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'addresses_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customer_cart_summary';
            referencedColumns: ['customer_id'];
          },
          {
            foreignKeyName: 'addresses_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'addresses_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers_with_address';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'addresses_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers_with_address_granted_access';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'addresses_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'unapproved_customers';
            referencedColumns: ['id'];
          },
        ];
      };
      app_versions: {
        Row: {
          app_type: Database['public']['Enums']['app_type'];
          branch_id: string;
          created_at: string;
          force_update: boolean;
          id: string;
          min_version: string;
          version: string;
        };
        Insert: {
          app_type: Database['public']['Enums']['app_type'];
          branch_id: string;
          created_at?: string;
          force_update: boolean;
          id?: string;
          min_version: string;
          version: string;
        };
        Update: {
          app_type?: Database['public']['Enums']['app_type'];
          branch_id?: string;
          created_at?: string;
          force_update?: boolean;
          id?: string;
          min_version?: string;
          version?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'app_versions_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
        ];
      };
      barcodes: {
        Row: {
          barcode: string;
          created_at: string;
          id: string;
          product_id: string;
        };
        Insert: {
          barcode: string;
          created_at?: string;
          id?: string;
          product_id: string;
        };
        Update: {
          barcode?: string;
          created_at?: string;
          id?: string;
          product_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'barcodes_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'discounted_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'barcodes_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'featured_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'barcodes_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'hidden_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'barcodes_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'in_stock_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'barcodes_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'lifetime_product_sales';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'barcodes_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'out_of_stock_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'barcodes_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'product_sales_analytics';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'barcodes_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'barcodes_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'shown_products';
            referencedColumns: ['id'];
          },
        ];
      };
      branch_settings: {
        Row: {
          branch_id: string;
          delivery_fee: number;
          delivery_fee_type: Database['public']['Enums']['delivery_fee_type'];
          delivery_miles_radius: number;
          delivery_minimum: number;
          enforce_delivery_minimum_for_sales: boolean;
          id: string;
          is_app_enabled: boolean;
          is_card_payment_allowed: boolean;
          is_delivery_allowed: boolean;
          is_ordering_allowed: boolean;
          is_pay_on_delivery_allowed: boolean;
          is_pay_on_pickup_allowed: boolean;
          is_pay_on_shipment_enabled: boolean;
          is_pickup_allowed: boolean;
          is_shipment_allowed: boolean;
          pickup_minimum: number;
          shipment_minimum: number;
          skip_delivery_minimum_salesperson: boolean;
          status: Database['public']['Enums']['branch_status'];
          tax_percentage: number;
          updated_at: string;
        };
        Insert: {
          branch_id: string;
          delivery_fee?: number;
          delivery_fee_type?: Database['public']['Enums']['delivery_fee_type'];
          delivery_miles_radius?: number;
          delivery_minimum?: number;
          enforce_delivery_minimum_for_sales?: boolean;
          id?: string;
          is_app_enabled?: boolean;
          is_card_payment_allowed?: boolean;
          is_delivery_allowed?: boolean;
          is_ordering_allowed?: boolean;
          is_pay_on_delivery_allowed?: boolean;
          is_pay_on_pickup_allowed?: boolean;
          is_pay_on_shipment_enabled?: boolean;
          is_pickup_allowed?: boolean;
          is_shipment_allowed?: boolean;
          pickup_minimum?: number;
          shipment_minimum?: number;
          skip_delivery_minimum_salesperson?: boolean;
          status?: Database['public']['Enums']['branch_status'];
          tax_percentage?: number;
          updated_at?: string;
        };
        Update: {
          branch_id?: string;
          delivery_fee?: number;
          delivery_fee_type?: Database['public']['Enums']['delivery_fee_type'];
          delivery_miles_radius?: number;
          delivery_minimum?: number;
          enforce_delivery_minimum_for_sales?: boolean;
          id?: string;
          is_app_enabled?: boolean;
          is_card_payment_allowed?: boolean;
          is_delivery_allowed?: boolean;
          is_ordering_allowed?: boolean;
          is_pay_on_delivery_allowed?: boolean;
          is_pay_on_pickup_allowed?: boolean;
          is_pay_on_shipment_enabled?: boolean;
          is_pickup_allowed?: boolean;
          is_shipment_allowed?: boolean;
          pickup_minimum?: number;
          shipment_minimum?: number;
          skip_delivery_minimum_salesperson?: boolean;
          status?: Database['public']['Enums']['branch_status'];
          tax_percentage?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'branch_settings_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: true;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
        ];
      };
      branches: {
        Row: {
          address: string;
          city: string;
          country: string;
          created_at: string | null;
          email: string;
          facebookUrl: string;
          id: string;
          instagramUrl: string;
          logoUrl: string | null;
          name: string;
          orders_notified_email: string | null;
          phone: string;
          state: string;
          textLogoUrl: string | null;
          twitterUrl: string;
          updated_at: string | null;
          zip_code: string;
        };
        Insert: {
          address: string;
          city: string;
          country: string;
          created_at?: string | null;
          email: string;
          facebookUrl?: string;
          id?: string;
          instagramUrl?: string;
          logoUrl?: string | null;
          name: string;
          orders_notified_email?: string | null;
          phone: string;
          state: string;
          textLogoUrl?: string | null;
          twitterUrl?: string;
          updated_at?: string | null;
          zip_code: string;
        };
        Update: {
          address?: string;
          city?: string;
          country?: string;
          created_at?: string | null;
          email?: string;
          facebookUrl?: string;
          id?: string;
          instagramUrl?: string;
          logoUrl?: string | null;
          name?: string;
          orders_notified_email?: string | null;
          phone?: string;
          state?: string;
          textLogoUrl?: string | null;
          twitterUrl?: string;
          updated_at?: string | null;
          zip_code?: string;
        };
        Relationships: [];
      };
      cart_items: {
        Row: {
          cart_id: string | null;
          created_at: string;
          customer_id: string;
          id: string;
          product_id: string;
          quantity: number;
        };
        Insert: {
          cart_id?: string | null;
          created_at?: string;
          customer_id: string;
          id?: string;
          product_id: string;
          quantity?: number;
        };
        Update: {
          cart_id?: string | null;
          created_at?: string;
          customer_id?: string;
          id?: string;
          product_id?: string;
          quantity?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'cart_items_cart_id_fkey';
            columns: ['cart_id'];
            isOneToOne: false;
            referencedRelation: 'carts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'cart_items_cart_id_fkey';
            columns: ['cart_id'];
            isOneToOne: false;
            referencedRelation: 'customer_cart_summary';
            referencedColumns: ['cart_id'];
          },
          {
            foreignKeyName: 'cart_items_customer_Id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'approved_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'cart_items_customer_Id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'belongs_independent_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'cart_items_customer_Id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'belongs_wholesale_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'cart_items_customer_Id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customer_cart_summary';
            referencedColumns: ['customer_id'];
          },
          {
            foreignKeyName: 'cart_items_customer_Id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'cart_items_customer_Id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers_with_address';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'cart_items_customer_Id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers_with_address_granted_access';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'cart_items_customer_Id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'unapproved_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'cart_items_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'discounted_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'cart_items_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'featured_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'cart_items_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'hidden_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'cart_items_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'in_stock_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'cart_items_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'lifetime_product_sales';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'cart_items_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'out_of_stock_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'cart_items_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'product_sales_analytics';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'cart_items_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'cart_items_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'shown_products';
            referencedColumns: ['id'];
          },
        ];
      };
      carts: {
        Row: {
          belongs_to: Database['public']['Enums']['customer_belongs_to'];
          cart_number: number;
          category: Database['public']['Enums']['order_category'];
          created_at: string;
          customer_id: string;
          id: string;
          is_default: boolean;
          sales_id: string | null;
        };
        Insert: {
          belongs_to?: Database['public']['Enums']['customer_belongs_to'];
          cart_number?: number;
          category?: Database['public']['Enums']['order_category'];
          created_at?: string;
          customer_id: string;
          id?: string;
          is_default?: boolean;
          sales_id?: string | null;
        };
        Update: {
          belongs_to?: Database['public']['Enums']['customer_belongs_to'];
          cart_number?: number;
          category?: Database['public']['Enums']['order_category'];
          created_at?: string;
          customer_id?: string;
          id?: string;
          is_default?: boolean;
          sales_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'carts_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'approved_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'carts_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'belongs_independent_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'carts_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'belongs_wholesale_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'carts_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customer_cart_summary';
            referencedColumns: ['customer_id'];
          },
          {
            foreignKeyName: 'carts_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'carts_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers_with_address';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'carts_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers_with_address_granted_access';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'carts_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'unapproved_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'carts_sales_id_fkey';
            columns: ['sales_id'];
            isOneToOne: false;
            referencedRelation: 'admin_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'carts_sales_id_fkey';
            columns: ['sales_id'];
            isOneToOne: false;
            referencedRelation: 'independent_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'carts_sales_id_fkey';
            columns: ['sales_id'];
            isOneToOne: false;
            referencedRelation: 'inhouse_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'carts_sales_id_fkey';
            columns: ['sales_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      categories: {
        Row: {
          branch_id: string;
          created_at: string;
          description: string | null;
          id: string;
          image_path: string | null;
          image_url: string | null;
          is_featured: boolean;
          name: string;
          parent_category_id: string | null;
          promoted: boolean;
          published: boolean;
          updated_at: string;
        };
        Insert: {
          branch_id: string;
          created_at?: string;
          description?: string | null;
          id?: string;
          image_path?: string | null;
          image_url?: string | null;
          is_featured?: boolean;
          name: string;
          parent_category_id?: string | null;
          promoted?: boolean;
          published?: boolean;
          updated_at?: string;
        };
        Update: {
          branch_id?: string;
          created_at?: string;
          description?: string | null;
          id?: string;
          image_path?: string | null;
          image_url?: string | null;
          is_featured?: boolean;
          name?: string;
          parent_category_id?: string | null;
          promoted?: boolean;
          published?: boolean;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'categories_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'categories_parent_category_id_fkey';
            columns: ['parent_category_id'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'categories_parent_category_id_fkey';
            columns: ['parent_category_id'];
            isOneToOne: false;
            referencedRelation: 'categories_sales_and_products_count';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'categories_parent_category_id_fkey';
            columns: ['parent_category_id'];
            isOneToOne: false;
            referencedRelation: 'featured_categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'categories_parent_category_id_fkey';
            columns: ['parent_category_id'];
            isOneToOne: false;
            referencedRelation: 'parent_categories';
            referencedColumns: ['id'];
          },
        ];
      };
      custom_promotions: {
        Row: {
          branch_id: string;
          call_to_action: string;
          created_at: string;
          description: string;
          id: number;
          image_path: string | null;
          image_url: string | null;
          label: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          branch_id: string;
          call_to_action: string;
          created_at?: string;
          description: string;
          id?: number;
          image_path?: string | null;
          image_url?: string | null;
          label: string;
          title?: string;
          updated_at?: string;
        };
        Update: {
          branch_id?: string;
          call_to_action?: string;
          created_at?: string;
          description?: string;
          id?: number;
          image_path?: string | null;
          image_url?: string | null;
          label?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'custom_promotions_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
        ];
      };
      customer_access: {
        Row: {
          access_granted_date: string | null;
          customer_id: string;
          granted_by: string;
          salesperson_id: string;
        };
        Insert: {
          access_granted_date?: string | null;
          customer_id: string;
          granted_by: string;
          salesperson_id: string;
        };
        Update: {
          access_granted_date?: string | null;
          customer_id?: string;
          granted_by?: string;
          salesperson_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'customer_access_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'approved_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customer_access_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'belongs_independent_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customer_access_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'belongs_wholesale_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customer_access_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customer_cart_summary';
            referencedColumns: ['customer_id'];
          },
          {
            foreignKeyName: 'customer_access_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customer_access_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers_with_address';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customer_access_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers_with_address_granted_access';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customer_access_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'unapproved_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customer_access_granted_by_fkey';
            columns: ['granted_by'];
            isOneToOne: false;
            referencedRelation: 'admin_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customer_access_granted_by_fkey';
            columns: ['granted_by'];
            isOneToOne: false;
            referencedRelation: 'independent_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customer_access_granted_by_fkey';
            columns: ['granted_by'];
            isOneToOne: false;
            referencedRelation: 'inhouse_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customer_access_granted_by_fkey';
            columns: ['granted_by'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customer_access_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'admin_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customer_access_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'independent_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customer_access_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'inhouse_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customer_access_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      customers: {
        Row: {
          acknowledgement: Database['public']['Enums']['acknowledgement_status'];
          approved: boolean;
          approved_at: string | null;
          approved_tobacco: boolean;
          belongs_to: Database['public']['Enums']['customer_belongs_to'];
          blocked: boolean;
          branch_id: string;
          business_name: string;
          created_at: string;
          customer_type: Database['public']['Enums']['customer_type'];
          email: string;
          first_name: string;
          id: string;
          independent_sales_id: string | null;
          is_new_user: boolean;
          last_name: string;
          opted_in_text: boolean;
          phone: string;
          tax_id: string | null;
          tax_id_image_url: string | null;
          tobacco_license: string | null;
          tobacco_license_image_url: string | null;
          updated_at: string;
          wholesale_sales_id: string | null;
        };
        Insert: {
          acknowledgement?: Database['public']['Enums']['acknowledgement_status'];
          approved?: boolean;
          approved_at?: string | null;
          approved_tobacco?: boolean;
          belongs_to?: Database['public']['Enums']['customer_belongs_to'];
          blocked?: boolean;
          branch_id: string;
          business_name: string;
          created_at?: string;
          customer_type?: Database['public']['Enums']['customer_type'];
          email: string;
          first_name: string;
          id?: string;
          independent_sales_id?: string | null;
          is_new_user?: boolean;
          last_name: string;
          opted_in_text?: boolean;
          phone: string;
          tax_id?: string | null;
          tax_id_image_url?: string | null;
          tobacco_license?: string | null;
          tobacco_license_image_url?: string | null;
          updated_at?: string;
          wholesale_sales_id?: string | null;
        };
        Update: {
          acknowledgement?: Database['public']['Enums']['acknowledgement_status'];
          approved?: boolean;
          approved_at?: string | null;
          approved_tobacco?: boolean;
          belongs_to?: Database['public']['Enums']['customer_belongs_to'];
          blocked?: boolean;
          branch_id?: string;
          business_name?: string;
          created_at?: string;
          customer_type?: Database['public']['Enums']['customer_type'];
          email?: string;
          first_name?: string;
          id?: string;
          independent_sales_id?: string | null;
          is_new_user?: boolean;
          last_name?: string;
          opted_in_text?: boolean;
          phone?: string;
          tax_id?: string | null;
          tax_id_image_url?: string | null;
          tobacco_license?: string | null;
          tobacco_license_image_url?: string | null;
          updated_at?: string;
          wholesale_sales_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'customers_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_independent_sales_id_fkey';
            columns: ['independent_sales_id'];
            isOneToOne: false;
            referencedRelation: 'admin_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_independent_sales_id_fkey';
            columns: ['independent_sales_id'];
            isOneToOne: false;
            referencedRelation: 'independent_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_independent_sales_id_fkey';
            columns: ['independent_sales_id'];
            isOneToOne: false;
            referencedRelation: 'inhouse_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_independent_sales_id_fkey';
            columns: ['independent_sales_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_wholesale_sales_id_fkey';
            columns: ['wholesale_sales_id'];
            isOneToOne: false;
            referencedRelation: 'admin_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_wholesale_sales_id_fkey';
            columns: ['wholesale_sales_id'];
            isOneToOne: false;
            referencedRelation: 'independent_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_wholesale_sales_id_fkey';
            columns: ['wholesale_sales_id'];
            isOneToOne: false;
            referencedRelation: 'inhouse_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_wholesale_sales_id_fkey';
            columns: ['wholesale_sales_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      delete_requests: {
        Row: {
          additional_info: string | null;
          branch_id: string;
          confirm_ownership: boolean;
          created_at: string;
          email: string;
          full_name: string;
          id: string;
          password: string;
          reason: string;
          request_number: number;
          understand_irreversible: boolean;
        };
        Insert: {
          additional_info?: string | null;
          branch_id: string;
          confirm_ownership: boolean;
          created_at?: string;
          email: string;
          full_name: string;
          id?: string;
          password: string;
          reason: string;
          request_number?: number;
          understand_irreversible: boolean;
        };
        Update: {
          additional_info?: string | null;
          branch_id?: string;
          confirm_ownership?: boolean;
          created_at?: string;
          email?: string;
          full_name?: string;
          id?: string;
          password?: string;
          reason?: string;
          request_number?: number;
          understand_irreversible?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: 'delete_request_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
        ];
      };
      newsletter_emails: {
        Row: {
          branch_id: string;
          created_at: string;
          email: string;
          id: string;
          is_subscribed: boolean;
          subscription_date: string;
          updated_at: string;
        };
        Insert: {
          branch_id: string;
          created_at?: string;
          email: string;
          id?: string;
          is_subscribed?: boolean;
          subscription_date?: string;
          updated_at?: string;
        };
        Update: {
          branch_id?: string;
          created_at?: string;
          email?: string;
          id?: string;
          is_subscribed?: boolean;
          subscription_date?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'newsletter_emails_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
        ];
      };
      order_items: {
        Row: {
          created_at: string;
          discount_amount: number;
          discount_per_unit: number;
          id: string;
          order_id: string;
          original_quantity: number;
          original_total: number;
          product_id: string;
          quantity: number;
          refunded_amount: number;
          refunded_quantity: number;
          status: Database['public']['Enums']['order_item_status'];
          tax_amount: number;
          tax_per_unit: number;
          total_price: number;
          unit_price: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          discount_amount?: number;
          discount_per_unit?: number;
          id?: string;
          order_id: string;
          original_quantity?: number;
          original_total?: number;
          product_id: string;
          quantity: number;
          refunded_amount?: number;
          refunded_quantity?: number;
          status?: Database['public']['Enums']['order_item_status'];
          tax_amount?: number;
          tax_per_unit?: number;
          total_price: number;
          unit_price: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          discount_amount?: number;
          discount_per_unit?: number;
          id?: string;
          order_id?: string;
          original_quantity?: number;
          original_total?: number;
          product_id?: string;
          quantity?: number;
          refunded_amount?: number;
          refunded_quantity?: number;
          status?: Database['public']['Enums']['order_item_status'];
          tax_amount?: number;
          tax_per_unit?: number;
          total_price?: number;
          unit_price?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'order_items_order_id_fkey1';
            columns: ['order_id'];
            isOneToOne: false;
            referencedRelation: 'completed_orders';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_order_id_fkey1';
            columns: ['order_id'];
            isOneToOne: false;
            referencedRelation: 'confirmed_orders';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_order_id_fkey1';
            columns: ['order_id'];
            isOneToOne: false;
            referencedRelation: 'orders';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_order_id_fkey1';
            columns: ['order_id'];
            isOneToOne: false;
            referencedRelation: 'orders_with_customer';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_order_id_fkey1';
            columns: ['order_id'];
            isOneToOne: false;
            referencedRelation: 'pending_orders';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_order_id_fkey1';
            columns: ['order_id'];
            isOneToOne: false;
            referencedRelation: 'ready_orders';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_order_id_fkey1';
            columns: ['order_id'];
            isOneToOne: false;
            referencedRelation: 'refunded_orders';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_product_id_fkey1';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'discounted_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_product_id_fkey1';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'featured_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_product_id_fkey1';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'hidden_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_product_id_fkey1';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'in_stock_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_product_id_fkey1';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'lifetime_product_sales';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_product_id_fkey1';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'out_of_stock_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_product_id_fkey1';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'product_sales_analytics';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_product_id_fkey1';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_product_id_fkey1';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'shown_products';
            referencedColumns: ['id'];
          },
        ];
      };
      order_payments: {
        Row: {
          check_amount: number | null;
          check_number: string | null;
          created_at: string;
          id: string;
          later_payment_method: Database['public']['Enums']['pay_later_methods'] | null;
          order_id: string;
          payment_amount: number;
          payment_date: string | null;
          payment_method_id: string | null;
          payment_status: Database['public']['Enums']['payment_status'];
          payment_type: Database['public']['Enums']['payment_type'];
          tran_key: string | null;
        };
        Insert: {
          check_amount?: number | null;
          check_number?: string | null;
          created_at?: string;
          id?: string;
          later_payment_method?: Database['public']['Enums']['pay_later_methods'] | null;
          order_id: string;
          payment_amount: number;
          payment_date?: string | null;
          payment_method_id?: string | null;
          payment_status?: Database['public']['Enums']['payment_status'];
          payment_type: Database['public']['Enums']['payment_type'];
          tran_key?: string | null;
        };
        Update: {
          check_amount?: number | null;
          check_number?: string | null;
          created_at?: string;
          id?: string;
          later_payment_method?: Database['public']['Enums']['pay_later_methods'] | null;
          order_id?: string;
          payment_amount?: number;
          payment_date?: string | null;
          payment_method_id?: string | null;
          payment_status?: Database['public']['Enums']['payment_status'];
          payment_type?: Database['public']['Enums']['payment_type'];
          tran_key?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'order_payments_order_id_fkey';
            columns: ['order_id'];
            isOneToOne: true;
            referencedRelation: 'completed_orders';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_payments_order_id_fkey';
            columns: ['order_id'];
            isOneToOne: true;
            referencedRelation: 'confirmed_orders';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_payments_order_id_fkey';
            columns: ['order_id'];
            isOneToOne: true;
            referencedRelation: 'orders';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_payments_order_id_fkey';
            columns: ['order_id'];
            isOneToOne: true;
            referencedRelation: 'orders_with_customer';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_payments_order_id_fkey';
            columns: ['order_id'];
            isOneToOne: true;
            referencedRelation: 'pending_orders';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_payments_order_id_fkey';
            columns: ['order_id'];
            isOneToOne: true;
            referencedRelation: 'ready_orders';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_payments_order_id_fkey';
            columns: ['order_id'];
            isOneToOne: true;
            referencedRelation: 'refunded_orders';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_payments_payment_method_id_fkey';
            columns: ['payment_method_id'];
            isOneToOne: false;
            referencedRelation: 'payment_methods';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_payments_payment_method_id_fkey';
            columns: ['payment_method_id'];
            isOneToOne: false;
            referencedRelation: 'payment_methods_with_spending';
            referencedColumns: ['id'];
          },
        ];
      };
      order_shipping: {
        Row: {
          id: string;
          order_id: string;
          provider: string;
          shipped_at: string;
          tracking_number: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          provider: string;
          shipped_at: string;
          tracking_number: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          provider?: string;
          shipped_at?: string;
          tracking_number?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'order_shipping_order_id_fkey';
            columns: ['order_id'];
            isOneToOne: true;
            referencedRelation: 'completed_orders';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_shipping_order_id_fkey';
            columns: ['order_id'];
            isOneToOne: true;
            referencedRelation: 'confirmed_orders';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_shipping_order_id_fkey';
            columns: ['order_id'];
            isOneToOne: true;
            referencedRelation: 'orders';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_shipping_order_id_fkey';
            columns: ['order_id'];
            isOneToOne: true;
            referencedRelation: 'orders_with_customer';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_shipping_order_id_fkey';
            columns: ['order_id'];
            isOneToOne: true;
            referencedRelation: 'pending_orders';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_shipping_order_id_fkey';
            columns: ['order_id'];
            isOneToOne: true;
            referencedRelation: 'ready_orders';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_shipping_order_id_fkey';
            columns: ['order_id'];
            isOneToOne: true;
            referencedRelation: 'refunded_orders';
            referencedColumns: ['id'];
          },
        ];
      };
      orders: {
        Row: {
          branch_id: string;
          cancelled_at: string | null;
          completed_at: string | null;
          confirmed_at: string | null;
          created_at: string;
          customer_id: string;
          delivery_address_id: string | null;
          delivery_fee: number;
          expected_delivery_at: string | null;
          fees: number;
          id: string;
          instructions: string | null;
          order_category: Database['public']['Enums']['order_category'];
          order_number: string;
          original_order_number: string | null;
          preparing_at: string | null;
          quantity_refunded: number;
          ready_at: string | null;
          refunded_at: string | null;
          salesperson_customer_id: string | null;
          salesperson_id: string | null;
          shipping_costs: number | null;
          status: Database['public']['Enums']['order_status'];
          subtotal: number | null;
          tax: number;
          total_amount: number;
          total_before_calculations: number;
          total_discount: number;
          total_quantity: number;
          total_refunded: number;
          type: Database['public']['Enums']['order_type'];
          updated_at: string;
        };
        Insert: {
          branch_id: string;
          cancelled_at?: string | null;
          completed_at?: string | null;
          confirmed_at?: string | null;
          created_at?: string;
          customer_id: string;
          delivery_address_id?: string | null;
          delivery_fee?: number;
          expected_delivery_at?: string | null;
          fees?: number;
          id?: string;
          instructions?: string | null;
          order_category?: Database['public']['Enums']['order_category'];
          order_number: string;
          original_order_number?: string | null;
          preparing_at?: string | null;
          quantity_refunded?: number;
          ready_at?: string | null;
          refunded_at?: string | null;
          salesperson_customer_id?: string | null;
          salesperson_id?: string | null;
          shipping_costs?: number | null;
          status?: Database['public']['Enums']['order_status'];
          subtotal?: number | null;
          tax?: number;
          total_amount: number;
          total_before_calculations?: number;
          total_discount?: number;
          total_quantity: number;
          total_refunded?: number;
          type: Database['public']['Enums']['order_type'];
          updated_at?: string;
        };
        Update: {
          branch_id?: string;
          cancelled_at?: string | null;
          completed_at?: string | null;
          confirmed_at?: string | null;
          created_at?: string;
          customer_id?: string;
          delivery_address_id?: string | null;
          delivery_fee?: number;
          expected_delivery_at?: string | null;
          fees?: number;
          id?: string;
          instructions?: string | null;
          order_category?: Database['public']['Enums']['order_category'];
          order_number?: string;
          original_order_number?: string | null;
          preparing_at?: string | null;
          quantity_refunded?: number;
          ready_at?: string | null;
          refunded_at?: string | null;
          salesperson_customer_id?: string | null;
          salesperson_id?: string | null;
          shipping_costs?: number | null;
          status?: Database['public']['Enums']['order_status'];
          subtotal?: number | null;
          tax?: number;
          total_amount?: number;
          total_before_calculations?: number;
          total_discount?: number;
          total_quantity?: number;
          total_refunded?: number;
          type?: Database['public']['Enums']['order_type'];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'orders_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'approved_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'belongs_independent_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'belongs_wholesale_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customer_cart_summary';
            referencedColumns: ['customer_id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers_with_address';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers_with_address_granted_access';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'unapproved_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_delivery_address_id_fkey';
            columns: ['delivery_address_id'];
            isOneToOne: false;
            referencedRelation: 'addresses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_delivery_address_id_fkey';
            columns: ['delivery_address_id'];
            isOneToOne: false;
            referencedRelation: 'billing_addresses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_delivery_address_id_fkey';
            columns: ['delivery_address_id'];
            isOneToOne: false;
            referencedRelation: 'delivery_addresses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'admin_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'independent_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'inhouse_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      payment_methods: {
        Row: {
          added_at: string;
          billing_address_id: string | null;
          card_holder: string;
          customer_id: string;
          deleted: boolean;
          expiration: string | null;
          id: string;
          is_default: boolean;
          last_four: string;
          provider: Database['public']['Enums']['card_provider'];
          token: string;
        };
        Insert: {
          added_at?: string;
          billing_address_id?: string | null;
          card_holder?: string;
          customer_id: string;
          deleted?: boolean;
          expiration?: string | null;
          id?: string;
          is_default?: boolean;
          last_four: string;
          provider: Database['public']['Enums']['card_provider'];
          token: string;
        };
        Update: {
          added_at?: string;
          billing_address_id?: string | null;
          card_holder?: string;
          customer_id?: string;
          deleted?: boolean;
          expiration?: string | null;
          id?: string;
          is_default?: boolean;
          last_four?: string;
          provider?: Database['public']['Enums']['card_provider'];
          token?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'payment_methods_billing_address_id_fkey';
            columns: ['billing_address_id'];
            isOneToOne: false;
            referencedRelation: 'addresses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'payment_methods_billing_address_id_fkey';
            columns: ['billing_address_id'];
            isOneToOne: false;
            referencedRelation: 'billing_addresses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'payment_methods_billing_address_id_fkey';
            columns: ['billing_address_id'];
            isOneToOne: false;
            referencedRelation: 'delivery_addresses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'payment_methods_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'approved_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'payment_methods_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'belongs_independent_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'payment_methods_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'belongs_wholesale_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'payment_methods_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customer_cart_summary';
            referencedColumns: ['customer_id'];
          },
          {
            foreignKeyName: 'payment_methods_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'payment_methods_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers_with_address';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'payment_methods_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers_with_address_granted_access';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'payment_methods_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'unapproved_customers';
            referencedColumns: ['id'];
          },
        ];
      };
      product_images: {
        Row: {
          created_at: string;
          id: string;
          path: string;
          product_id: string;
          url: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          path: string;
          product_id: string;
          url: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          path?: string;
          product_id?: string;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'product_images_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'discounted_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'product_images_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'featured_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'product_images_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'hidden_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'product_images_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'in_stock_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'product_images_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'lifetime_product_sales';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'product_images_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'out_of_stock_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'product_images_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'product_sales_analytics';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'product_images_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'product_images_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'shown_products';
            referencedColumns: ['id'];
          },
        ];
      };
      products: {
        Row: {
          branch_id: string;
          case_count: number | null;
          category_id: string;
          cost_price: number;
          created_at: string;
          description: string | null;
          discount: number | null;
          discounted_until: string | null;
          id: string;
          in_stock: boolean;
          is_featured: boolean;
          is_taxed: boolean;
          is_tobacco: boolean;
          item_number: string | null;
          manufacturer: string | null;
          max_per_order: number | null;
          name: string;
          published: boolean;
          retail_discount: number | null;
          retail_price: number;
          unit: string | null;
          updated_at: string;
          wholesale_discount: number | null;
          wholesale_price: number;
        };
        Insert: {
          branch_id: string;
          case_count?: number | null;
          category_id: string;
          cost_price?: number;
          created_at?: string;
          description?: string | null;
          discount?: number | null;
          discounted_until?: string | null;
          id?: string;
          in_stock?: boolean;
          is_featured?: boolean;
          is_taxed?: boolean;
          is_tobacco?: boolean;
          item_number?: string | null;
          manufacturer?: string | null;
          max_per_order?: number | null;
          name: string;
          published?: boolean;
          retail_discount?: number | null;
          retail_price: number;
          unit?: string | null;
          updated_at?: string;
          wholesale_discount?: number | null;
          wholesale_price: number;
        };
        Update: {
          branch_id?: string;
          case_count?: number | null;
          category_id?: string;
          cost_price?: number;
          created_at?: string;
          description?: string | null;
          discount?: number | null;
          discounted_until?: string | null;
          id?: string;
          in_stock?: boolean;
          is_featured?: boolean;
          is_taxed?: boolean;
          is_tobacco?: boolean;
          item_number?: string | null;
          manufacturer?: string | null;
          max_per_order?: number | null;
          name?: string;
          published?: boolean;
          retail_discount?: number | null;
          retail_price?: number;
          unit?: string | null;
          updated_at?: string;
          wholesale_discount?: number | null;
          wholesale_price?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'products_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'products_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'products_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories_sales_and_products_count';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'products_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'featured_categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'products_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'parent_categories';
            referencedColumns: ['id'];
          },
        ];
      };
      promoted_products: {
        Row: {
          branch_id: string;
          created_at: string;
          id: number;
          label: string | null;
          product_id: string;
          updated_at: string;
        };
        Insert: {
          branch_id?: string;
          created_at?: string;
          id?: number;
          label?: string | null;
          product_id?: string;
          updated_at?: string;
        };
        Update: {
          branch_id?: string;
          created_at?: string;
          id?: number;
          label?: string | null;
          product_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'promoted_products_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'promoted_products_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'discounted_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'promoted_products_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'featured_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'promoted_products_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'hidden_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'promoted_products_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'in_stock_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'promoted_products_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'lifetime_product_sales';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'promoted_products_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'out_of_stock_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'promoted_products_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'product_sales_analytics';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'promoted_products_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'promoted_products_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'shown_products';
            referencedColumns: ['id'];
          },
        ];
      };
      sequence_control: {
        Row: {
          last_reset: string | null;
          name: string;
        };
        Insert: {
          last_reset?: string | null;
          name: string;
        };
        Update: {
          last_reset?: string | null;
          name?: string;
        };
        Relationships: [];
      };
      users: {
        Row: {
          admin_pin: string | null;
          blocked: boolean;
          branch_id: string;
          created_at: string;
          email: string;
          first_name: string;
          id: string;
          is_new_user: boolean;
          last_name: string;
          phone: string | null;
          role: Database['public']['Enums']['user_role'];
          updated_at: string;
        };
        Insert: {
          admin_pin?: string | null;
          blocked?: boolean;
          branch_id: string;
          created_at?: string;
          email: string;
          first_name: string;
          id?: string;
          is_new_user?: boolean;
          last_name: string;
          phone?: string | null;
          role: Database['public']['Enums']['user_role'];
          updated_at?: string;
        };
        Update: {
          admin_pin?: string | null;
          blocked?: boolean;
          branch_id?: string;
          created_at?: string;
          email?: string;
          first_name?: string;
          id?: string;
          is_new_user?: boolean;
          last_name?: string;
          phone?: string | null;
          role?: Database['public']['Enums']['user_role'];
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'users_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
        ];
      };
      wishlist_items: {
        Row: {
          added_at: string;
          customer_id: string;
          id: string;
          product_id: string;
        };
        Insert: {
          added_at?: string;
          customer_id: string;
          id?: string;
          product_id: string;
        };
        Update: {
          added_at?: string;
          customer_id?: string;
          id?: string;
          product_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'wishlist_items_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'approved_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'wishlist_items_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'belongs_independent_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'wishlist_items_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'belongs_wholesale_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'wishlist_items_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customer_cart_summary';
            referencedColumns: ['customer_id'];
          },
          {
            foreignKeyName: 'wishlist_items_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'wishlist_items_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers_with_address';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'wishlist_items_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers_with_address_granted_access';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'wishlist_items_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'unapproved_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'wishlist_items_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'discounted_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'wishlist_items_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'featured_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'wishlist_items_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'hidden_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'wishlist_items_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'in_stock_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'wishlist_items_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'lifetime_product_sales';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'wishlist_items_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'out_of_stock_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'wishlist_items_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'product_sales_analytics';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'wishlist_items_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'wishlist_items_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'shown_products';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      admin_users: {
        Row: {
          admin_pin: string | null;
          blocked: boolean | null;
          branch_id: string | null;
          created_at: string | null;
          email: string | null;
          first_name: string | null;
          id: string | null;
          last_name: string | null;
          phone: string | null;
          role: Database['public']['Enums']['user_role'] | null;
          updated_at: string | null;
        };
        Insert: {
          admin_pin?: string | null;
          blocked?: boolean | null;
          branch_id?: string | null;
          created_at?: string | null;
          email?: string | null;
          first_name?: string | null;
          id?: string | null;
          last_name?: string | null;
          phone?: string | null;
          role?: Database['public']['Enums']['user_role'] | null;
          updated_at?: string | null;
        };
        Update: {
          admin_pin?: string | null;
          blocked?: boolean | null;
          branch_id?: string | null;
          created_at?: string | null;
          email?: string | null;
          first_name?: string | null;
          id?: string | null;
          last_name?: string | null;
          phone?: string | null;
          role?: Database['public']['Enums']['user_role'] | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'users_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
        ];
      };
      approved_customers: {
        Row: {
          approved: boolean | null;
          approved_at: string | null;
          belongs_to: Database['public']['Enums']['customer_belongs_to'] | null;
          blocked: boolean | null;
          branch_id: string | null;
          business_name: string | null;
          created_at: string | null;
          customer_type: Database['public']['Enums']['customer_type'] | null;
          email: string | null;
          first_name: string | null;
          id: string | null;
          independent_sales_id: string | null;
          last_name: string | null;
          opted_in_text: boolean | null;
          phone: string | null;
          tax_id: string | null;
          tobacco_license: string | null;
          updated_at: string | null;
        };
        Insert: {
          approved?: boolean | null;
          approved_at?: string | null;
          belongs_to?: Database['public']['Enums']['customer_belongs_to'] | null;
          blocked?: boolean | null;
          branch_id?: string | null;
          business_name?: string | null;
          created_at?: string | null;
          customer_type?: Database['public']['Enums']['customer_type'] | null;
          email?: string | null;
          first_name?: string | null;
          id?: string | null;
          independent_sales_id?: string | null;
          last_name?: string | null;
          opted_in_text?: boolean | null;
          phone?: string | null;
          tax_id?: string | null;
          tobacco_license?: string | null;
          updated_at?: string | null;
        };
        Update: {
          approved?: boolean | null;
          approved_at?: string | null;
          belongs_to?: Database['public']['Enums']['customer_belongs_to'] | null;
          blocked?: boolean | null;
          branch_id?: string | null;
          business_name?: string | null;
          created_at?: string | null;
          customer_type?: Database['public']['Enums']['customer_type'] | null;
          email?: string | null;
          first_name?: string | null;
          id?: string | null;
          independent_sales_id?: string | null;
          last_name?: string | null;
          opted_in_text?: boolean | null;
          phone?: string | null;
          tax_id?: string | null;
          tobacco_license?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'customers_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_independent_sales_id_fkey';
            columns: ['independent_sales_id'];
            isOneToOne: false;
            referencedRelation: 'admin_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_independent_sales_id_fkey';
            columns: ['independent_sales_id'];
            isOneToOne: false;
            referencedRelation: 'independent_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_independent_sales_id_fkey';
            columns: ['independent_sales_id'];
            isOneToOne: false;
            referencedRelation: 'inhouse_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_independent_sales_id_fkey';
            columns: ['independent_sales_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      belongs_independent_customers: {
        Row: {
          approved: boolean | null;
          approved_at: string | null;
          belongs_to: Database['public']['Enums']['customer_belongs_to'] | null;
          blocked: boolean | null;
          branch_id: string | null;
          business_name: string | null;
          created_at: string | null;
          customer_type: Database['public']['Enums']['customer_type'] | null;
          email: string | null;
          first_name: string | null;
          id: string | null;
          independent_sales_id: string | null;
          last_name: string | null;
          opted_in_text: boolean | null;
          phone: string | null;
          tax_id: string | null;
          tobacco_license: string | null;
          updated_at: string | null;
        };
        Insert: {
          approved?: boolean | null;
          approved_at?: string | null;
          belongs_to?: Database['public']['Enums']['customer_belongs_to'] | null;
          blocked?: boolean | null;
          branch_id?: string | null;
          business_name?: string | null;
          created_at?: string | null;
          customer_type?: Database['public']['Enums']['customer_type'] | null;
          email?: string | null;
          first_name?: string | null;
          id?: string | null;
          independent_sales_id?: string | null;
          last_name?: string | null;
          opted_in_text?: boolean | null;
          phone?: string | null;
          tax_id?: string | null;
          tobacco_license?: string | null;
          updated_at?: string | null;
        };
        Update: {
          approved?: boolean | null;
          approved_at?: string | null;
          belongs_to?: Database['public']['Enums']['customer_belongs_to'] | null;
          blocked?: boolean | null;
          branch_id?: string | null;
          business_name?: string | null;
          created_at?: string | null;
          customer_type?: Database['public']['Enums']['customer_type'] | null;
          email?: string | null;
          first_name?: string | null;
          id?: string | null;
          independent_sales_id?: string | null;
          last_name?: string | null;
          opted_in_text?: boolean | null;
          phone?: string | null;
          tax_id?: string | null;
          tobacco_license?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'customers_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_independent_sales_id_fkey';
            columns: ['independent_sales_id'];
            isOneToOne: false;
            referencedRelation: 'admin_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_independent_sales_id_fkey';
            columns: ['independent_sales_id'];
            isOneToOne: false;
            referencedRelation: 'independent_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_independent_sales_id_fkey';
            columns: ['independent_sales_id'];
            isOneToOne: false;
            referencedRelation: 'inhouse_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_independent_sales_id_fkey';
            columns: ['independent_sales_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      belongs_wholesale_customers: {
        Row: {
          approved: boolean | null;
          approved_at: string | null;
          belongs_to: Database['public']['Enums']['customer_belongs_to'] | null;
          blocked: boolean | null;
          branch_id: string | null;
          business_name: string | null;
          created_at: string | null;
          customer_type: Database['public']['Enums']['customer_type'] | null;
          email: string | null;
          first_name: string | null;
          id: string | null;
          independent_sales_id: string | null;
          last_name: string | null;
          opted_in_text: boolean | null;
          phone: string | null;
          tax_id: string | null;
          tobacco_license: string | null;
          updated_at: string | null;
        };
        Insert: {
          approved?: boolean | null;
          approved_at?: string | null;
          belongs_to?: Database['public']['Enums']['customer_belongs_to'] | null;
          blocked?: boolean | null;
          branch_id?: string | null;
          business_name?: string | null;
          created_at?: string | null;
          customer_type?: Database['public']['Enums']['customer_type'] | null;
          email?: string | null;
          first_name?: string | null;
          id?: string | null;
          independent_sales_id?: string | null;
          last_name?: string | null;
          opted_in_text?: boolean | null;
          phone?: string | null;
          tax_id?: string | null;
          tobacco_license?: string | null;
          updated_at?: string | null;
        };
        Update: {
          approved?: boolean | null;
          approved_at?: string | null;
          belongs_to?: Database['public']['Enums']['customer_belongs_to'] | null;
          blocked?: boolean | null;
          branch_id?: string | null;
          business_name?: string | null;
          created_at?: string | null;
          customer_type?: Database['public']['Enums']['customer_type'] | null;
          email?: string | null;
          first_name?: string | null;
          id?: string | null;
          independent_sales_id?: string | null;
          last_name?: string | null;
          opted_in_text?: boolean | null;
          phone?: string | null;
          tax_id?: string | null;
          tobacco_license?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'customers_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_independent_sales_id_fkey';
            columns: ['independent_sales_id'];
            isOneToOne: false;
            referencedRelation: 'admin_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_independent_sales_id_fkey';
            columns: ['independent_sales_id'];
            isOneToOne: false;
            referencedRelation: 'independent_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_independent_sales_id_fkey';
            columns: ['independent_sales_id'];
            isOneToOne: false;
            referencedRelation: 'inhouse_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_independent_sales_id_fkey';
            columns: ['independent_sales_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      billing_addresses: {
        Row: {
          city: string | null;
          country: string | null;
          created_at: string | null;
          id: string | null;
          state: string | null;
          street: string | null;
          type: Database['public']['Enums']['address_type'] | null;
          updated_at: string | null;
          user_id: string | null;
          zip_code: string | null;
        };
        Insert: {
          city?: string | null;
          country?: string | null;
          created_at?: string | null;
          id?: string | null;
          state?: string | null;
          street?: string | null;
          type?: Database['public']['Enums']['address_type'] | null;
          updated_at?: string | null;
          user_id?: string | null;
          zip_code?: string | null;
        };
        Update: {
          city?: string | null;
          country?: string | null;
          created_at?: string | null;
          id?: string | null;
          state?: string | null;
          street?: string | null;
          type?: Database['public']['Enums']['address_type'] | null;
          updated_at?: string | null;
          user_id?: string | null;
          zip_code?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'addresses_customer_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'approved_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'addresses_customer_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'belongs_independent_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'addresses_customer_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'belongs_wholesale_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'addresses_customer_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'customer_cart_summary';
            referencedColumns: ['customer_id'];
          },
          {
            foreignKeyName: 'addresses_customer_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'addresses_customer_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'customers_with_address';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'addresses_customer_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'customers_with_address_granted_access';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'addresses_customer_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'unapproved_customers';
            referencedColumns: ['id'];
          },
        ];
      };
      categories_sales_and_products_count: {
        Row: {
          branch_id: string | null;
          created_at: string | null;
          description: string | null;
          id: string | null;
          image_path: string | null;
          image_url: string | null;
          is_featured: boolean | null;
          name: string | null;
          parent_category_id: string | null;
          product_count: number | null;
          published: boolean | null;
          sales: number | null;
          subcategory_count: number | null;
          updated_at: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'categories_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'categories_parent_category_id_fkey';
            columns: ['parent_category_id'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'categories_parent_category_id_fkey';
            columns: ['parent_category_id'];
            isOneToOne: false;
            referencedRelation: 'categories_sales_and_products_count';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'categories_parent_category_id_fkey';
            columns: ['parent_category_id'];
            isOneToOne: false;
            referencedRelation: 'featured_categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'categories_parent_category_id_fkey';
            columns: ['parent_category_id'];
            isOneToOne: false;
            referencedRelation: 'parent_categories';
            referencedColumns: ['id'];
          },
        ];
      };
      category_manufacturers: {
        Row: {
          branch_id: string | null;
          category_id: string | null;
          manufacturer: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'products_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'products_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'products_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories_sales_and_products_count';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'products_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'featured_categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'products_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'parent_categories';
            referencedColumns: ['id'];
          },
        ];
      };
      completed_orders: {
        Row: {
          branch_id: string | null;
          cancelled_at: string | null;
          completed_at: string | null;
          confirmed_at: string | null;
          created_at: string | null;
          customer_id: string | null;
          delivery_address_id: string | null;
          delivery_fee: number | null;
          expected_delivery_at: string | null;
          fees: number | null;
          id: string | null;
          instructions: string | null;
          order_category: Database['public']['Enums']['order_category'] | null;
          order_number: string | null;
          original_order_number: string | null;
          preparing_at: string | null;
          quantity_refunded: number | null;
          ready_at: string | null;
          refunded_at: string | null;
          salesperson_customer_id: string | null;
          salesperson_id: string | null;
          shipping_costs: number | null;
          status: Database['public']['Enums']['order_status'] | null;
          subtotal: number | null;
          tax: number | null;
          total_amount: number | null;
          total_before_calculations: number | null;
          total_discount: number | null;
          total_quantity: number | null;
          total_refunded: number | null;
          type: Database['public']['Enums']['order_type'] | null;
          updated_at: string | null;
        };
        Insert: {
          branch_id?: string | null;
          cancelled_at?: string | null;
          completed_at?: string | null;
          confirmed_at?: string | null;
          created_at?: string | null;
          customer_id?: string | null;
          delivery_address_id?: string | null;
          delivery_fee?: number | null;
          expected_delivery_at?: string | null;
          fees?: number | null;
          id?: string | null;
          instructions?: string | null;
          order_category?: Database['public']['Enums']['order_category'] | null;
          order_number?: string | null;
          original_order_number?: string | null;
          preparing_at?: string | null;
          quantity_refunded?: number | null;
          ready_at?: string | null;
          refunded_at?: string | null;
          salesperson_customer_id?: string | null;
          salesperson_id?: string | null;
          shipping_costs?: number | null;
          status?: Database['public']['Enums']['order_status'] | null;
          subtotal?: number | null;
          tax?: number | null;
          total_amount?: number | null;
          total_before_calculations?: number | null;
          total_discount?: number | null;
          total_quantity?: number | null;
          total_refunded?: number | null;
          type?: Database['public']['Enums']['order_type'] | null;
          updated_at?: string | null;
        };
        Update: {
          branch_id?: string | null;
          cancelled_at?: string | null;
          completed_at?: string | null;
          confirmed_at?: string | null;
          created_at?: string | null;
          customer_id?: string | null;
          delivery_address_id?: string | null;
          delivery_fee?: number | null;
          expected_delivery_at?: string | null;
          fees?: number | null;
          id?: string | null;
          instructions?: string | null;
          order_category?: Database['public']['Enums']['order_category'] | null;
          order_number?: string | null;
          original_order_number?: string | null;
          preparing_at?: string | null;
          quantity_refunded?: number | null;
          ready_at?: string | null;
          refunded_at?: string | null;
          salesperson_customer_id?: string | null;
          salesperson_id?: string | null;
          shipping_costs?: number | null;
          status?: Database['public']['Enums']['order_status'] | null;
          subtotal?: number | null;
          tax?: number | null;
          total_amount?: number | null;
          total_before_calculations?: number | null;
          total_discount?: number | null;
          total_quantity?: number | null;
          total_refunded?: number | null;
          type?: Database['public']['Enums']['order_type'] | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'orders_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'approved_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'belongs_independent_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'belongs_wholesale_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customer_cart_summary';
            referencedColumns: ['customer_id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers_with_address';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers_with_address_granted_access';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'unapproved_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_delivery_address_id_fkey';
            columns: ['delivery_address_id'];
            isOneToOne: false;
            referencedRelation: 'addresses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_delivery_address_id_fkey';
            columns: ['delivery_address_id'];
            isOneToOne: false;
            referencedRelation: 'billing_addresses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_delivery_address_id_fkey';
            columns: ['delivery_address_id'];
            isOneToOne: false;
            referencedRelation: 'delivery_addresses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'admin_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'independent_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'inhouse_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      confirmed_orders: {
        Row: {
          branch_id: string | null;
          cancelled_at: string | null;
          completed_at: string | null;
          confirmed_at: string | null;
          created_at: string | null;
          customer_id: string | null;
          delivery_address_id: string | null;
          delivery_fee: number | null;
          expected_delivery_at: string | null;
          fees: number | null;
          id: string | null;
          instructions: string | null;
          order_category: Database['public']['Enums']['order_category'] | null;
          order_number: string | null;
          original_order_number: string | null;
          preparing_at: string | null;
          quantity_refunded: number | null;
          ready_at: string | null;
          refunded_at: string | null;
          salesperson_customer_id: string | null;
          salesperson_id: string | null;
          shipping_costs: number | null;
          status: Database['public']['Enums']['order_status'] | null;
          subtotal: number | null;
          tax: number | null;
          total_amount: number | null;
          total_before_calculations: number | null;
          total_discount: number | null;
          total_quantity: number | null;
          total_refunded: number | null;
          type: Database['public']['Enums']['order_type'] | null;
          updated_at: string | null;
        };
        Insert: {
          branch_id?: string | null;
          cancelled_at?: string | null;
          completed_at?: string | null;
          confirmed_at?: string | null;
          created_at?: string | null;
          customer_id?: string | null;
          delivery_address_id?: string | null;
          delivery_fee?: number | null;
          expected_delivery_at?: string | null;
          fees?: number | null;
          id?: string | null;
          instructions?: string | null;
          order_category?: Database['public']['Enums']['order_category'] | null;
          order_number?: string | null;
          original_order_number?: string | null;
          preparing_at?: string | null;
          quantity_refunded?: number | null;
          ready_at?: string | null;
          refunded_at?: string | null;
          salesperson_customer_id?: string | null;
          salesperson_id?: string | null;
          shipping_costs?: number | null;
          status?: Database['public']['Enums']['order_status'] | null;
          subtotal?: number | null;
          tax?: number | null;
          total_amount?: number | null;
          total_before_calculations?: number | null;
          total_discount?: number | null;
          total_quantity?: number | null;
          total_refunded?: number | null;
          type?: Database['public']['Enums']['order_type'] | null;
          updated_at?: string | null;
        };
        Update: {
          branch_id?: string | null;
          cancelled_at?: string | null;
          completed_at?: string | null;
          confirmed_at?: string | null;
          created_at?: string | null;
          customer_id?: string | null;
          delivery_address_id?: string | null;
          delivery_fee?: number | null;
          expected_delivery_at?: string | null;
          fees?: number | null;
          id?: string | null;
          instructions?: string | null;
          order_category?: Database['public']['Enums']['order_category'] | null;
          order_number?: string | null;
          original_order_number?: string | null;
          preparing_at?: string | null;
          quantity_refunded?: number | null;
          ready_at?: string | null;
          refunded_at?: string | null;
          salesperson_customer_id?: string | null;
          salesperson_id?: string | null;
          shipping_costs?: number | null;
          status?: Database['public']['Enums']['order_status'] | null;
          subtotal?: number | null;
          tax?: number | null;
          total_amount?: number | null;
          total_before_calculations?: number | null;
          total_discount?: number | null;
          total_quantity?: number | null;
          total_refunded?: number | null;
          type?: Database['public']['Enums']['order_type'] | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'orders_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'approved_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'belongs_independent_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'belongs_wholesale_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customer_cart_summary';
            referencedColumns: ['customer_id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers_with_address';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers_with_address_granted_access';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'unapproved_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_delivery_address_id_fkey';
            columns: ['delivery_address_id'];
            isOneToOne: false;
            referencedRelation: 'addresses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_delivery_address_id_fkey';
            columns: ['delivery_address_id'];
            isOneToOne: false;
            referencedRelation: 'billing_addresses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_delivery_address_id_fkey';
            columns: ['delivery_address_id'];
            isOneToOne: false;
            referencedRelation: 'delivery_addresses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'admin_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'independent_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'inhouse_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      customer_cart_summary: {
        Row: {
          cart_id: string | null;
          cart_items: Json | null;
          cart_total: number | null;
          cart_total_with_delivery: number | null;
          customer_id: string | null;
          expected_delivery_fee: number | null;
          subtotal: number | null;
          total_discount: number | null;
          total_items: number | null;
          total_quantity: number | null;
          total_tax: number | null;
        };
        Relationships: [];
      };
      customers_with_address: {
        Row: {
          acknowledgement: Database['public']['Enums']['acknowledgement_status'] | null;
          approved: boolean | null;
          approved_at: string | null;
          approved_tobacco: boolean | null;
          belongs_to: Database['public']['Enums']['customer_belongs_to'] | null;
          blocked: boolean | null;
          branch_id: string | null;
          business_name: string | null;
          city: string | null;
          country: string | null;
          created_at: string | null;
          customer_type: Database['public']['Enums']['customer_type'] | null;
          email: string | null;
          first_name: string | null;
          id: string | null;
          independent_sales_id: string | null;
          is_new_user: boolean | null;
          last_name: string | null;
          opted_in_text: boolean | null;
          order_count: number | null;
          phone: string | null;
          state: string | null;
          street: string | null;
          tax_id: string | null;
          tax_id_image_url: string | null;
          tobacco_license: string | null;
          tobacco_license_image_url: string | null;
          total_spent: number | null;
          updated_at: string | null;
          wholesale_sales_id: string | null;
          zip_code: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'customers_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_independent_sales_id_fkey';
            columns: ['independent_sales_id'];
            isOneToOne: false;
            referencedRelation: 'admin_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_independent_sales_id_fkey';
            columns: ['independent_sales_id'];
            isOneToOne: false;
            referencedRelation: 'independent_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_independent_sales_id_fkey';
            columns: ['independent_sales_id'];
            isOneToOne: false;
            referencedRelation: 'inhouse_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_independent_sales_id_fkey';
            columns: ['independent_sales_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_wholesale_sales_id_fkey';
            columns: ['wholesale_sales_id'];
            isOneToOne: false;
            referencedRelation: 'admin_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_wholesale_sales_id_fkey';
            columns: ['wholesale_sales_id'];
            isOneToOne: false;
            referencedRelation: 'independent_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_wholesale_sales_id_fkey';
            columns: ['wholesale_sales_id'];
            isOneToOne: false;
            referencedRelation: 'inhouse_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_wholesale_sales_id_fkey';
            columns: ['wholesale_sales_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      customers_with_address_granted_access: {
        Row: {
          approved: boolean | null;
          approved_at: string | null;
          approved_tobacco: boolean | null;
          belongs_to: Database['public']['Enums']['customer_belongs_to'] | null;
          blocked: boolean | null;
          branch_id: string | null;
          business_name: string | null;
          city: string | null;
          country: string | null;
          created_at: string | null;
          customer_type: Database['public']['Enums']['customer_type'] | null;
          email: string | null;
          first_name: string | null;
          has_access: string | null;
          id: string | null;
          independent_sales_id: string | null;
          last_name: string | null;
          opted_in_text: boolean | null;
          order_count: number | null;
          phone: string | null;
          state: string | null;
          street: string | null;
          tax_id: string | null;
          tax_id_image_url: string | null;
          tobacco_license: string | null;
          tobacco_license_image_url: string | null;
          total_spent: number | null;
          updated_at: string | null;
          wholesale_sales_id: string | null;
          zip_code: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'customer_access_salesperson_id_fkey';
            columns: ['has_access'];
            isOneToOne: false;
            referencedRelation: 'admin_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customer_access_salesperson_id_fkey';
            columns: ['has_access'];
            isOneToOne: false;
            referencedRelation: 'independent_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customer_access_salesperson_id_fkey';
            columns: ['has_access'];
            isOneToOne: false;
            referencedRelation: 'inhouse_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customer_access_salesperson_id_fkey';
            columns: ['has_access'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_independent_sales_id_fkey';
            columns: ['independent_sales_id'];
            isOneToOne: false;
            referencedRelation: 'admin_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_independent_sales_id_fkey';
            columns: ['independent_sales_id'];
            isOneToOne: false;
            referencedRelation: 'independent_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_independent_sales_id_fkey';
            columns: ['independent_sales_id'];
            isOneToOne: false;
            referencedRelation: 'inhouse_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_independent_sales_id_fkey';
            columns: ['independent_sales_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_wholesale_sales_id_fkey';
            columns: ['wholesale_sales_id'];
            isOneToOne: false;
            referencedRelation: 'admin_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_wholesale_sales_id_fkey';
            columns: ['wholesale_sales_id'];
            isOneToOne: false;
            referencedRelation: 'independent_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_wholesale_sales_id_fkey';
            columns: ['wholesale_sales_id'];
            isOneToOne: false;
            referencedRelation: 'inhouse_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_wholesale_sales_id_fkey';
            columns: ['wholesale_sales_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      daily_branch_analytics: {
        Row: {
          branch_id: string | null;
          cogs: number | null;
          new_customers: number | null;
          order_date: string | null;
          revenue: number | null;
          total_products_sold: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'orders_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
        ];
      };
      delivery_addresses: {
        Row: {
          city: string | null;
          country: string | null;
          created_at: string | null;
          id: string | null;
          state: string | null;
          street: string | null;
          type: Database['public']['Enums']['address_type'] | null;
          updated_at: string | null;
          user_id: string | null;
          zip_code: string | null;
        };
        Insert: {
          city?: string | null;
          country?: string | null;
          created_at?: string | null;
          id?: string | null;
          state?: string | null;
          street?: string | null;
          type?: Database['public']['Enums']['address_type'] | null;
          updated_at?: string | null;
          user_id?: string | null;
          zip_code?: string | null;
        };
        Update: {
          city?: string | null;
          country?: string | null;
          created_at?: string | null;
          id?: string | null;
          state?: string | null;
          street?: string | null;
          type?: Database['public']['Enums']['address_type'] | null;
          updated_at?: string | null;
          user_id?: string | null;
          zip_code?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'addresses_customer_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'approved_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'addresses_customer_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'belongs_independent_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'addresses_customer_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'belongs_wholesale_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'addresses_customer_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'customer_cart_summary';
            referencedColumns: ['customer_id'];
          },
          {
            foreignKeyName: 'addresses_customer_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'addresses_customer_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'customers_with_address';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'addresses_customer_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'customers_with_address_granted_access';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'addresses_customer_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'unapproved_customers';
            referencedColumns: ['id'];
          },
        ];
      };
      discounted_products: {
        Row: {
          branch_id: string | null;
          category_id: string | null;
          cost_price: number | null;
          created_at: string | null;
          description: string | null;
          discount: number | null;
          discounted_until: string | null;
          id: string | null;
          in_stock: boolean | null;
          is_featured: boolean | null;
          is_taxed: boolean | null;
          is_tobacco: boolean | null;
          item_number: string | null;
          manufacturer: string | null;
          max_per_order: number | null;
          name: string | null;
          published: boolean | null;
          retail_discount: number | null;
          retail_price: number | null;
          unit: string | null;
          updated_at: string | null;
          wholesale_discount: number | null;
          wholesale_price: number | null;
        };
        Insert: {
          branch_id?: string | null;
          category_id?: string | null;
          cost_price?: number | null;
          created_at?: string | null;
          description?: string | null;
          discount?: number | null;
          discounted_until?: string | null;
          id?: string | null;
          in_stock?: boolean | null;
          is_featured?: boolean | null;
          is_taxed?: boolean | null;
          is_tobacco?: boolean | null;
          item_number?: string | null;
          manufacturer?: string | null;
          max_per_order?: number | null;
          name?: string | null;
          published?: boolean | null;
          retail_discount?: number | null;
          retail_price?: number | null;
          unit?: string | null;
          updated_at?: string | null;
          wholesale_discount?: number | null;
          wholesale_price?: number | null;
        };
        Update: {
          branch_id?: string | null;
          category_id?: string | null;
          cost_price?: number | null;
          created_at?: string | null;
          description?: string | null;
          discount?: number | null;
          discounted_until?: string | null;
          id?: string | null;
          in_stock?: boolean | null;
          is_featured?: boolean | null;
          is_taxed?: boolean | null;
          is_tobacco?: boolean | null;
          item_number?: string | null;
          manufacturer?: string | null;
          max_per_order?: number | null;
          name?: string | null;
          published?: boolean | null;
          retail_discount?: number | null;
          retail_price?: number | null;
          unit?: string | null;
          updated_at?: string | null;
          wholesale_discount?: number | null;
          wholesale_price?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'products_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'products_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'products_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories_sales_and_products_count';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'products_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'featured_categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'products_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'parent_categories';
            referencedColumns: ['id'];
          },
        ];
      };
      featured_categories: {
        Row: {
          created_at: string | null;
          description: string | null;
          hide: boolean | null;
          id: string | null;
          is_featured: boolean | null;
          name: string | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          hide?: boolean | null;
          id?: string | null;
          is_featured?: boolean | null;
          name?: string | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          hide?: boolean | null;
          id?: string | null;
          is_featured?: boolean | null;
          name?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      featured_products: {
        Row: {
          branch_id: string | null;
          case_count: number | null;
          category_id: string | null;
          cost_price: number | null;
          created_at: string | null;
          description: string | null;
          discount: number | null;
          discounted_until: string | null;
          id: string | null;
          in_stock: boolean | null;
          is_featured: boolean | null;
          is_taxed: boolean | null;
          is_tobacco: boolean | null;
          item_number: string | null;
          manufacturer: string | null;
          max_per_order: number | null;
          name: string | null;
          published: boolean | null;
          retail_discount: number | null;
          retail_price: number | null;
          unit: string | null;
          updated_at: string | null;
          wholesale_discount: number | null;
          wholesale_price: number | null;
        };
        Insert: {
          branch_id?: string | null;
          case_count?: number | null;
          category_id?: string | null;
          cost_price?: number | null;
          created_at?: string | null;
          description?: string | null;
          discount?: number | null;
          discounted_until?: string | null;
          id?: string | null;
          in_stock?: boolean | null;
          is_featured?: boolean | null;
          is_taxed?: boolean | null;
          is_tobacco?: boolean | null;
          item_number?: string | null;
          manufacturer?: string | null;
          max_per_order?: number | null;
          name?: string | null;
          published?: boolean | null;
          retail_discount?: number | null;
          retail_price?: number | null;
          unit?: string | null;
          updated_at?: string | null;
          wholesale_discount?: number | null;
          wholesale_price?: number | null;
        };
        Update: {
          branch_id?: string | null;
          case_count?: number | null;
          category_id?: string | null;
          cost_price?: number | null;
          created_at?: string | null;
          description?: string | null;
          discount?: number | null;
          discounted_until?: string | null;
          id?: string | null;
          in_stock?: boolean | null;
          is_featured?: boolean | null;
          is_taxed?: boolean | null;
          is_tobacco?: boolean | null;
          item_number?: string | null;
          manufacturer?: string | null;
          max_per_order?: number | null;
          name?: string | null;
          published?: boolean | null;
          retail_discount?: number | null;
          retail_price?: number | null;
          unit?: string | null;
          updated_at?: string | null;
          wholesale_discount?: number | null;
          wholesale_price?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'products_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'products_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'products_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories_sales_and_products_count';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'products_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'featured_categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'products_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'parent_categories';
            referencedColumns: ['id'];
          },
        ];
      };
      hidden_products: {
        Row: {
          branch_id: string | null;
          case_count: number | null;
          category_id: string | null;
          cost_price: number | null;
          created_at: string | null;
          description: string | null;
          discount: number | null;
          discounted_until: string | null;
          id: string | null;
          in_stock: boolean | null;
          is_featured: boolean | null;
          is_taxed: boolean | null;
          is_tobacco: boolean | null;
          item_number: string | null;
          manufacturer: string | null;
          max_per_order: number | null;
          name: string | null;
          published: boolean | null;
          retail_discount: number | null;
          retail_price: number | null;
          unit: string | null;
          updated_at: string | null;
          wholesale_discount: number | null;
          wholesale_price: number | null;
        };
        Insert: {
          branch_id?: string | null;
          case_count?: number | null;
          category_id?: string | null;
          cost_price?: number | null;
          created_at?: string | null;
          description?: string | null;
          discount?: number | null;
          discounted_until?: string | null;
          id?: string | null;
          in_stock?: boolean | null;
          is_featured?: boolean | null;
          is_taxed?: boolean | null;
          is_tobacco?: boolean | null;
          item_number?: string | null;
          manufacturer?: string | null;
          max_per_order?: number | null;
          name?: string | null;
          published?: boolean | null;
          retail_discount?: number | null;
          retail_price?: number | null;
          unit?: string | null;
          updated_at?: string | null;
          wholesale_discount?: number | null;
          wholesale_price?: number | null;
        };
        Update: {
          branch_id?: string | null;
          case_count?: number | null;
          category_id?: string | null;
          cost_price?: number | null;
          created_at?: string | null;
          description?: string | null;
          discount?: number | null;
          discounted_until?: string | null;
          id?: string | null;
          in_stock?: boolean | null;
          is_featured?: boolean | null;
          is_taxed?: boolean | null;
          is_tobacco?: boolean | null;
          item_number?: string | null;
          manufacturer?: string | null;
          max_per_order?: number | null;
          name?: string | null;
          published?: boolean | null;
          retail_discount?: number | null;
          retail_price?: number | null;
          unit?: string | null;
          updated_at?: string | null;
          wholesale_discount?: number | null;
          wholesale_price?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'products_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'products_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'products_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories_sales_and_products_count';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'products_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'featured_categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'products_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'parent_categories';
            referencedColumns: ['id'];
          },
        ];
      };
      in_stock_products: {
        Row: {
          branch_id: string | null;
          case_count: number | null;
          category_id: string | null;
          cost_price: number | null;
          created_at: string | null;
          description: string | null;
          discount: number | null;
          discounted_until: string | null;
          id: string | null;
          in_stock: boolean | null;
          is_featured: boolean | null;
          is_taxed: boolean | null;
          is_tobacco: boolean | null;
          item_number: string | null;
          manufacturer: string | null;
          max_per_order: number | null;
          name: string | null;
          published: boolean | null;
          retail_discount: number | null;
          retail_price: number | null;
          unit: string | null;
          updated_at: string | null;
          wholesale_discount: number | null;
          wholesale_price: number | null;
        };
        Insert: {
          branch_id?: string | null;
          case_count?: number | null;
          category_id?: string | null;
          cost_price?: number | null;
          created_at?: string | null;
          description?: string | null;
          discount?: number | null;
          discounted_until?: string | null;
          id?: string | null;
          in_stock?: boolean | null;
          is_featured?: boolean | null;
          is_taxed?: boolean | null;
          is_tobacco?: boolean | null;
          item_number?: string | null;
          manufacturer?: string | null;
          max_per_order?: number | null;
          name?: string | null;
          published?: boolean | null;
          retail_discount?: number | null;
          retail_price?: number | null;
          unit?: string | null;
          updated_at?: string | null;
          wholesale_discount?: number | null;
          wholesale_price?: number | null;
        };
        Update: {
          branch_id?: string | null;
          case_count?: number | null;
          category_id?: string | null;
          cost_price?: number | null;
          created_at?: string | null;
          description?: string | null;
          discount?: number | null;
          discounted_until?: string | null;
          id?: string | null;
          in_stock?: boolean | null;
          is_featured?: boolean | null;
          is_taxed?: boolean | null;
          is_tobacco?: boolean | null;
          item_number?: string | null;
          manufacturer?: string | null;
          max_per_order?: number | null;
          name?: string | null;
          published?: boolean | null;
          retail_discount?: number | null;
          retail_price?: number | null;
          unit?: string | null;
          updated_at?: string | null;
          wholesale_discount?: number | null;
          wholesale_price?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'products_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'products_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'products_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories_sales_and_products_count';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'products_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'featured_categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'products_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'parent_categories';
            referencedColumns: ['id'];
          },
        ];
      };
      independent_sales_users: {
        Row: {
          admin_pin: string | null;
          blocked: boolean | null;
          branch_id: string | null;
          created_at: string | null;
          email: string | null;
          first_name: string | null;
          id: string | null;
          last_name: string | null;
          phone: string | null;
          role: Database['public']['Enums']['user_role'] | null;
          updated_at: string | null;
        };
        Insert: {
          admin_pin?: string | null;
          blocked?: boolean | null;
          branch_id?: string | null;
          created_at?: string | null;
          email?: string | null;
          first_name?: string | null;
          id?: string | null;
          last_name?: string | null;
          phone?: string | null;
          role?: Database['public']['Enums']['user_role'] | null;
          updated_at?: string | null;
        };
        Update: {
          admin_pin?: string | null;
          blocked?: boolean | null;
          branch_id?: string | null;
          created_at?: string | null;
          email?: string | null;
          first_name?: string | null;
          id?: string | null;
          last_name?: string | null;
          phone?: string | null;
          role?: Database['public']['Enums']['user_role'] | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'users_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
        ];
      };
      independent_salesperson_branch_analytics: {
        Row: {
          branch_id: string | null;
          order_date: string | null;
          revenue: number | null;
          salesperson_id: string | null;
          total_products_sold: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'orders_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'admin_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'independent_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'inhouse_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      inhouse_sales_users: {
        Row: {
          admin_pin: string | null;
          blocked: boolean | null;
          branch_id: string | null;
          created_at: string | null;
          email: string | null;
          first_name: string | null;
          id: string | null;
          last_name: string | null;
          phone: string | null;
          role: Database['public']['Enums']['user_role'] | null;
          updated_at: string | null;
        };
        Insert: {
          admin_pin?: string | null;
          blocked?: boolean | null;
          branch_id?: string | null;
          created_at?: string | null;
          email?: string | null;
          first_name?: string | null;
          id?: string | null;
          last_name?: string | null;
          phone?: string | null;
          role?: Database['public']['Enums']['user_role'] | null;
          updated_at?: string | null;
        };
        Update: {
          admin_pin?: string | null;
          blocked?: boolean | null;
          branch_id?: string | null;
          created_at?: string | null;
          email?: string | null;
          first_name?: string | null;
          id?: string | null;
          last_name?: string | null;
          phone?: string | null;
          role?: Database['public']['Enums']['user_role'] | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'users_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
        ];
      };
      lifetime_product_sales: {
        Row: {
          branch_id: string | null;
          id: string | null;
          product_id: string | null;
          sales: number | null;
          total_sales_value: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'order_items_product_id_fkey1';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'discounted_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_product_id_fkey1';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'featured_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_product_id_fkey1';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'hidden_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_product_id_fkey1';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'in_stock_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_product_id_fkey1';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'lifetime_product_sales';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_product_id_fkey1';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'out_of_stock_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_product_id_fkey1';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'product_sales_analytics';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_product_id_fkey1';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_product_id_fkey1';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'shown_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'products_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
        ];
      };
      manufacturer_sales_analytics: {
        Row: {
          branch_id: string | null;
          manufacturer: string | null;
          total_products: number | null;
          total_sales: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'products_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
        ];
      };
      orders_with_customer: {
        Row: {
          branch_id: string | null;
          business_name: string | null;
          cancelled_at: string | null;
          completed_at: string | null;
          confirmed_at: string | null;
          created_at: string | null;
          customer_id: string | null;
          delivery_address_id: string | null;
          delivery_fee: number | null;
          email: string | null;
          expected_delivery_at: string | null;
          fees: number | null;
          id: string | null;
          instructions: string | null;
          order_category: Database['public']['Enums']['order_category'] | null;
          order_number: string | null;
          original_order_number: string | null;
          payment_status: Database['public']['Enums']['payment_status'] | null;
          payment_type: Database['public']['Enums']['payment_type'] | null;
          phone: string | null;
          preparing_at: string | null;
          quantity_refunded: number | null;
          ready_at: string | null;
          refunded_at: string | null;
          salesperson_customer_id: string | null;
          salesperson_id: string | null;
          shipping_costs: number | null;
          status: Database['public']['Enums']['order_status'] | null;
          subtotal: number | null;
          tax: number | null;
          total_amount: number | null;
          total_before_calculations: number | null;
          total_discount: number | null;
          total_quantity: number | null;
          total_refunded: number | null;
          type: Database['public']['Enums']['order_type'] | null;
          updated_at: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'orders_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'approved_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'belongs_independent_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'belongs_wholesale_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customer_cart_summary';
            referencedColumns: ['customer_id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers_with_address';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers_with_address_granted_access';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'unapproved_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_delivery_address_id_fkey';
            columns: ['delivery_address_id'];
            isOneToOne: false;
            referencedRelation: 'addresses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_delivery_address_id_fkey';
            columns: ['delivery_address_id'];
            isOneToOne: false;
            referencedRelation: 'billing_addresses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_delivery_address_id_fkey';
            columns: ['delivery_address_id'];
            isOneToOne: false;
            referencedRelation: 'delivery_addresses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'admin_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'independent_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'inhouse_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      out_of_stock_products: {
        Row: {
          branch_id: string | null;
          case_count: number | null;
          category_id: string | null;
          cost_price: number | null;
          created_at: string | null;
          description: string | null;
          discount: number | null;
          discounted_until: string | null;
          id: string | null;
          in_stock: boolean | null;
          is_featured: boolean | null;
          is_taxed: boolean | null;
          is_tobacco: boolean | null;
          item_number: string | null;
          manufacturer: string | null;
          max_per_order: number | null;
          name: string | null;
          published: boolean | null;
          retail_discount: number | null;
          retail_price: number | null;
          unit: string | null;
          updated_at: string | null;
          wholesale_discount: number | null;
          wholesale_price: number | null;
        };
        Insert: {
          branch_id?: string | null;
          case_count?: number | null;
          category_id?: string | null;
          cost_price?: number | null;
          created_at?: string | null;
          description?: string | null;
          discount?: number | null;
          discounted_until?: string | null;
          id?: string | null;
          in_stock?: boolean | null;
          is_featured?: boolean | null;
          is_taxed?: boolean | null;
          is_tobacco?: boolean | null;
          item_number?: string | null;
          manufacturer?: string | null;
          max_per_order?: number | null;
          name?: string | null;
          published?: boolean | null;
          retail_discount?: number | null;
          retail_price?: number | null;
          unit?: string | null;
          updated_at?: string | null;
          wholesale_discount?: number | null;
          wholesale_price?: number | null;
        };
        Update: {
          branch_id?: string | null;
          case_count?: number | null;
          category_id?: string | null;
          cost_price?: number | null;
          created_at?: string | null;
          description?: string | null;
          discount?: number | null;
          discounted_until?: string | null;
          id?: string | null;
          in_stock?: boolean | null;
          is_featured?: boolean | null;
          is_taxed?: boolean | null;
          is_tobacco?: boolean | null;
          item_number?: string | null;
          manufacturer?: string | null;
          max_per_order?: number | null;
          name?: string | null;
          published?: boolean | null;
          retail_discount?: number | null;
          retail_price?: number | null;
          unit?: string | null;
          updated_at?: string | null;
          wholesale_discount?: number | null;
          wholesale_price?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'products_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'products_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'products_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories_sales_and_products_count';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'products_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'featured_categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'products_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'parent_categories';
            referencedColumns: ['id'];
          },
        ];
      };
      parent_categories: {
        Row: {
          branch_id: string | null;
          created_at: string | null;
          description: string | null;
          id: string | null;
          image_path: string | null;
          image_url: string | null;
          is_featured: boolean | null;
          name: string | null;
          parent_category_id: string | null;
          published: boolean | null;
          updated_at: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'categories_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'categories_parent_category_id_fkey';
            columns: ['parent_category_id'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'categories_parent_category_id_fkey';
            columns: ['parent_category_id'];
            isOneToOne: false;
            referencedRelation: 'categories_sales_and_products_count';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'categories_parent_category_id_fkey';
            columns: ['parent_category_id'];
            isOneToOne: false;
            referencedRelation: 'featured_categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'categories_parent_category_id_fkey';
            columns: ['parent_category_id'];
            isOneToOne: false;
            referencedRelation: 'parent_categories';
            referencedColumns: ['id'];
          },
        ];
      };
      payment_methods_with_spending: {
        Row: {
          added_at: string | null;
          billing_address_id: string | null;
          card_holder: string | null;
          customer_id: string | null;
          id: string | null;
          is_default: boolean | null;
          last_four: string | null;
          provider: Database['public']['Enums']['card_provider'] | null;
          token: string | null;
          total_approved_spending: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'payment_methods_billing_address_id_fkey';
            columns: ['billing_address_id'];
            isOneToOne: false;
            referencedRelation: 'addresses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'payment_methods_billing_address_id_fkey';
            columns: ['billing_address_id'];
            isOneToOne: false;
            referencedRelation: 'billing_addresses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'payment_methods_billing_address_id_fkey';
            columns: ['billing_address_id'];
            isOneToOne: false;
            referencedRelation: 'delivery_addresses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'payment_methods_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'approved_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'payment_methods_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'belongs_independent_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'payment_methods_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'belongs_wholesale_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'payment_methods_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customer_cart_summary';
            referencedColumns: ['customer_id'];
          },
          {
            foreignKeyName: 'payment_methods_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'payment_methods_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers_with_address';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'payment_methods_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers_with_address_granted_access';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'payment_methods_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'unapproved_customers';
            referencedColumns: ['id'];
          },
        ];
      };
      pending_orders: {
        Row: {
          branch_id: string | null;
          cancelled_at: string | null;
          completed_at: string | null;
          confirmed_at: string | null;
          created_at: string | null;
          customer_id: string | null;
          delivery_address_id: string | null;
          delivery_fee: number | null;
          expected_delivery_at: string | null;
          fees: number | null;
          id: string | null;
          instructions: string | null;
          order_category: Database['public']['Enums']['order_category'] | null;
          order_number: string | null;
          original_order_number: string | null;
          preparing_at: string | null;
          quantity_refunded: number | null;
          ready_at: string | null;
          refunded_at: string | null;
          salesperson_customer_id: string | null;
          salesperson_id: string | null;
          shipping_costs: number | null;
          status: Database['public']['Enums']['order_status'] | null;
          subtotal: number | null;
          tax: number | null;
          total_amount: number | null;
          total_before_calculations: number | null;
          total_discount: number | null;
          total_quantity: number | null;
          total_refunded: number | null;
          type: Database['public']['Enums']['order_type'] | null;
          updated_at: string | null;
        };
        Insert: {
          branch_id?: string | null;
          cancelled_at?: string | null;
          completed_at?: string | null;
          confirmed_at?: string | null;
          created_at?: string | null;
          customer_id?: string | null;
          delivery_address_id?: string | null;
          delivery_fee?: number | null;
          expected_delivery_at?: string | null;
          fees?: number | null;
          id?: string | null;
          instructions?: string | null;
          order_category?: Database['public']['Enums']['order_category'] | null;
          order_number?: string | null;
          original_order_number?: string | null;
          preparing_at?: string | null;
          quantity_refunded?: number | null;
          ready_at?: string | null;
          refunded_at?: string | null;
          salesperson_customer_id?: string | null;
          salesperson_id?: string | null;
          shipping_costs?: number | null;
          status?: Database['public']['Enums']['order_status'] | null;
          subtotal?: number | null;
          tax?: number | null;
          total_amount?: number | null;
          total_before_calculations?: number | null;
          total_discount?: number | null;
          total_quantity?: number | null;
          total_refunded?: number | null;
          type?: Database['public']['Enums']['order_type'] | null;
          updated_at?: string | null;
        };
        Update: {
          branch_id?: string | null;
          cancelled_at?: string | null;
          completed_at?: string | null;
          confirmed_at?: string | null;
          created_at?: string | null;
          customer_id?: string | null;
          delivery_address_id?: string | null;
          delivery_fee?: number | null;
          expected_delivery_at?: string | null;
          fees?: number | null;
          id?: string | null;
          instructions?: string | null;
          order_category?: Database['public']['Enums']['order_category'] | null;
          order_number?: string | null;
          original_order_number?: string | null;
          preparing_at?: string | null;
          quantity_refunded?: number | null;
          ready_at?: string | null;
          refunded_at?: string | null;
          salesperson_customer_id?: string | null;
          salesperson_id?: string | null;
          shipping_costs?: number | null;
          status?: Database['public']['Enums']['order_status'] | null;
          subtotal?: number | null;
          tax?: number | null;
          total_amount?: number | null;
          total_before_calculations?: number | null;
          total_discount?: number | null;
          total_quantity?: number | null;
          total_refunded?: number | null;
          type?: Database['public']['Enums']['order_type'] | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'orders_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'approved_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'belongs_independent_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'belongs_wholesale_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customer_cart_summary';
            referencedColumns: ['customer_id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers_with_address';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers_with_address_granted_access';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'unapproved_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_delivery_address_id_fkey';
            columns: ['delivery_address_id'];
            isOneToOne: false;
            referencedRelation: 'addresses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_delivery_address_id_fkey';
            columns: ['delivery_address_id'];
            isOneToOne: false;
            referencedRelation: 'billing_addresses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_delivery_address_id_fkey';
            columns: ['delivery_address_id'];
            isOneToOne: false;
            referencedRelation: 'delivery_addresses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'admin_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'independent_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'inhouse_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      product_analytics: {
        Row: {
          branch_id: string | null;
          in_stock_count: number | null;
          out_of_stock_count: number | null;
          published_products_count: number | null;
          total_products_count: number | null;
          unpublished_products_count: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'products_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
        ];
      };
      product_sales_analytics: {
        Row: {
          branch_id: string | null;
          id: string | null;
          order_date: string | null;
          product_id: string | null;
          sales: number | null;
          total_sales_value: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'order_items_product_id_fkey1';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'discounted_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_product_id_fkey1';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'featured_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_product_id_fkey1';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'hidden_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_product_id_fkey1';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'in_stock_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_product_id_fkey1';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'lifetime_product_sales';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_product_id_fkey1';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'out_of_stock_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_product_id_fkey1';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'product_sales_analytics';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_product_id_fkey1';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_product_id_fkey1';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'shown_products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'products_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
        ];
      };
      ready_orders: {
        Row: {
          branch_id: string | null;
          cancelled_at: string | null;
          completed_at: string | null;
          confirmed_at: string | null;
          created_at: string | null;
          customer_id: string | null;
          delivery_address_id: string | null;
          delivery_fee: number | null;
          expected_delivery_at: string | null;
          fees: number | null;
          id: string | null;
          instructions: string | null;
          order_category: Database['public']['Enums']['order_category'] | null;
          order_number: string | null;
          original_order_number: string | null;
          preparing_at: string | null;
          quantity_refunded: number | null;
          ready_at: string | null;
          refunded_at: string | null;
          salesperson_customer_id: string | null;
          salesperson_id: string | null;
          shipping_costs: number | null;
          status: Database['public']['Enums']['order_status'] | null;
          subtotal: number | null;
          tax: number | null;
          total_amount: number | null;
          total_before_calculations: number | null;
          total_discount: number | null;
          total_quantity: number | null;
          total_refunded: number | null;
          type: Database['public']['Enums']['order_type'] | null;
          updated_at: string | null;
        };
        Insert: {
          branch_id?: string | null;
          cancelled_at?: string | null;
          completed_at?: string | null;
          confirmed_at?: string | null;
          created_at?: string | null;
          customer_id?: string | null;
          delivery_address_id?: string | null;
          delivery_fee?: number | null;
          expected_delivery_at?: string | null;
          fees?: number | null;
          id?: string | null;
          instructions?: string | null;
          order_category?: Database['public']['Enums']['order_category'] | null;
          order_number?: string | null;
          original_order_number?: string | null;
          preparing_at?: string | null;
          quantity_refunded?: number | null;
          ready_at?: string | null;
          refunded_at?: string | null;
          salesperson_customer_id?: string | null;
          salesperson_id?: string | null;
          shipping_costs?: number | null;
          status?: Database['public']['Enums']['order_status'] | null;
          subtotal?: number | null;
          tax?: number | null;
          total_amount?: number | null;
          total_before_calculations?: number | null;
          total_discount?: number | null;
          total_quantity?: number | null;
          total_refunded?: number | null;
          type?: Database['public']['Enums']['order_type'] | null;
          updated_at?: string | null;
        };
        Update: {
          branch_id?: string | null;
          cancelled_at?: string | null;
          completed_at?: string | null;
          confirmed_at?: string | null;
          created_at?: string | null;
          customer_id?: string | null;
          delivery_address_id?: string | null;
          delivery_fee?: number | null;
          expected_delivery_at?: string | null;
          fees?: number | null;
          id?: string | null;
          instructions?: string | null;
          order_category?: Database['public']['Enums']['order_category'] | null;
          order_number?: string | null;
          original_order_number?: string | null;
          preparing_at?: string | null;
          quantity_refunded?: number | null;
          ready_at?: string | null;
          refunded_at?: string | null;
          salesperson_customer_id?: string | null;
          salesperson_id?: string | null;
          shipping_costs?: number | null;
          status?: Database['public']['Enums']['order_status'] | null;
          subtotal?: number | null;
          tax?: number | null;
          total_amount?: number | null;
          total_before_calculations?: number | null;
          total_discount?: number | null;
          total_quantity?: number | null;
          total_refunded?: number | null;
          type?: Database['public']['Enums']['order_type'] | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'orders_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'approved_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'belongs_independent_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'belongs_wholesale_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customer_cart_summary';
            referencedColumns: ['customer_id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers_with_address';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers_with_address_granted_access';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'unapproved_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_delivery_address_id_fkey';
            columns: ['delivery_address_id'];
            isOneToOne: false;
            referencedRelation: 'addresses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_delivery_address_id_fkey';
            columns: ['delivery_address_id'];
            isOneToOne: false;
            referencedRelation: 'billing_addresses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_delivery_address_id_fkey';
            columns: ['delivery_address_id'];
            isOneToOne: false;
            referencedRelation: 'delivery_addresses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'admin_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'independent_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'inhouse_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      refunded_orders: {
        Row: {
          branch_id: string | null;
          cancelled_at: string | null;
          completed_at: string | null;
          confirmed_at: string | null;
          created_at: string | null;
          customer_id: string | null;
          delivery_address_id: string | null;
          delivery_fee: number | null;
          expected_delivery_at: string | null;
          fees: number | null;
          id: string | null;
          instructions: string | null;
          order_category: Database['public']['Enums']['order_category'] | null;
          order_number: string | null;
          original_order_number: string | null;
          preparing_at: string | null;
          quantity_refunded: number | null;
          ready_at: string | null;
          refunded_at: string | null;
          salesperson_customer_id: string | null;
          salesperson_id: string | null;
          shipping_costs: number | null;
          status: Database['public']['Enums']['order_status'] | null;
          subtotal: number | null;
          tax: number | null;
          total_amount: number | null;
          total_before_calculations: number | null;
          total_discount: number | null;
          total_quantity: number | null;
          total_refunded: number | null;
          type: Database['public']['Enums']['order_type'] | null;
          updated_at: string | null;
        };
        Insert: {
          branch_id?: string | null;
          cancelled_at?: string | null;
          completed_at?: string | null;
          confirmed_at?: string | null;
          created_at?: string | null;
          customer_id?: string | null;
          delivery_address_id?: string | null;
          delivery_fee?: number | null;
          expected_delivery_at?: string | null;
          fees?: number | null;
          id?: string | null;
          instructions?: string | null;
          order_category?: Database['public']['Enums']['order_category'] | null;
          order_number?: string | null;
          original_order_number?: string | null;
          preparing_at?: string | null;
          quantity_refunded?: number | null;
          ready_at?: string | null;
          refunded_at?: string | null;
          salesperson_customer_id?: string | null;
          salesperson_id?: string | null;
          shipping_costs?: number | null;
          status?: Database['public']['Enums']['order_status'] | null;
          subtotal?: number | null;
          tax?: number | null;
          total_amount?: number | null;
          total_before_calculations?: number | null;
          total_discount?: number | null;
          total_quantity?: number | null;
          total_refunded?: number | null;
          type?: Database['public']['Enums']['order_type'] | null;
          updated_at?: string | null;
        };
        Update: {
          branch_id?: string | null;
          cancelled_at?: string | null;
          completed_at?: string | null;
          confirmed_at?: string | null;
          created_at?: string | null;
          customer_id?: string | null;
          delivery_address_id?: string | null;
          delivery_fee?: number | null;
          expected_delivery_at?: string | null;
          fees?: number | null;
          id?: string | null;
          instructions?: string | null;
          order_category?: Database['public']['Enums']['order_category'] | null;
          order_number?: string | null;
          original_order_number?: string | null;
          preparing_at?: string | null;
          quantity_refunded?: number | null;
          ready_at?: string | null;
          refunded_at?: string | null;
          salesperson_customer_id?: string | null;
          salesperson_id?: string | null;
          shipping_costs?: number | null;
          status?: Database['public']['Enums']['order_status'] | null;
          subtotal?: number | null;
          tax?: number | null;
          total_amount?: number | null;
          total_before_calculations?: number | null;
          total_discount?: number | null;
          total_quantity?: number | null;
          total_refunded?: number | null;
          type?: Database['public']['Enums']['order_type'] | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'orders_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'approved_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'belongs_independent_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'belongs_wholesale_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customer_cart_summary';
            referencedColumns: ['customer_id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers_with_address';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'customers_with_address_granted_access';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            isOneToOne: false;
            referencedRelation: 'unapproved_customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_delivery_address_id_fkey';
            columns: ['delivery_address_id'];
            isOneToOne: false;
            referencedRelation: 'addresses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_delivery_address_id_fkey';
            columns: ['delivery_address_id'];
            isOneToOne: false;
            referencedRelation: 'billing_addresses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_delivery_address_id_fkey';
            columns: ['delivery_address_id'];
            isOneToOne: false;
            referencedRelation: 'delivery_addresses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'admin_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'independent_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'inhouse_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      salesperson_branch_analytics: {
        Row: {
          branch_id: string | null;
          order_date: string | null;
          revenue: number | null;
          salesperson_id: string | null;
          total_products_sold: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'orders_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'admin_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'independent_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'inhouse_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      shown_products: {
        Row: {
          branch_id: string | null;
          case_count: number | null;
          category_id: string | null;
          cost_price: number | null;
          created_at: string | null;
          description: string | null;
          discount: number | null;
          discounted_until: string | null;
          id: string | null;
          in_stock: boolean | null;
          is_featured: boolean | null;
          is_taxed: boolean | null;
          is_tobacco: boolean | null;
          item_number: string | null;
          manufacturer: string | null;
          max_per_order: number | null;
          name: string | null;
          published: boolean | null;
          retail_discount: number | null;
          retail_price: number | null;
          unit: string | null;
          updated_at: string | null;
          wholesale_discount: number | null;
          wholesale_price: number | null;
        };
        Insert: {
          branch_id?: string | null;
          case_count?: number | null;
          category_id?: string | null;
          cost_price?: number | null;
          created_at?: string | null;
          description?: string | null;
          discount?: number | null;
          discounted_until?: string | null;
          id?: string | null;
          in_stock?: boolean | null;
          is_featured?: boolean | null;
          is_taxed?: boolean | null;
          is_tobacco?: boolean | null;
          item_number?: string | null;
          manufacturer?: string | null;
          max_per_order?: number | null;
          name?: string | null;
          published?: boolean | null;
          retail_discount?: number | null;
          retail_price?: number | null;
          unit?: string | null;
          updated_at?: string | null;
          wholesale_discount?: number | null;
          wholesale_price?: number | null;
        };
        Update: {
          branch_id?: string | null;
          case_count?: number | null;
          category_id?: string | null;
          cost_price?: number | null;
          created_at?: string | null;
          description?: string | null;
          discount?: number | null;
          discounted_until?: string | null;
          id?: string | null;
          in_stock?: boolean | null;
          is_featured?: boolean | null;
          is_taxed?: boolean | null;
          is_tobacco?: boolean | null;
          item_number?: string | null;
          manufacturer?: string | null;
          max_per_order?: number | null;
          name?: string | null;
          published?: boolean | null;
          retail_discount?: number | null;
          retail_price?: number | null;
          unit?: string | null;
          updated_at?: string | null;
          wholesale_discount?: number | null;
          wholesale_price?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'products_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'products_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'products_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories_sales_and_products_count';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'products_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'featured_categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'products_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'parent_categories';
            referencedColumns: ['id'];
          },
        ];
      };
      unapproved_customers: {
        Row: {
          approved: boolean | null;
          approved_at: string | null;
          belongs_to: Database['public']['Enums']['customer_belongs_to'] | null;
          blocked: boolean | null;
          branch_id: string | null;
          business_name: string | null;
          created_at: string | null;
          customer_type: Database['public']['Enums']['customer_type'] | null;
          email: string | null;
          first_name: string | null;
          id: string | null;
          independent_sales_id: string | null;
          last_name: string | null;
          opted_in_text: boolean | null;
          phone: string | null;
          tax_id: string | null;
          tobacco_license: string | null;
          updated_at: string | null;
        };
        Insert: {
          approved?: boolean | null;
          approved_at?: string | null;
          belongs_to?: Database['public']['Enums']['customer_belongs_to'] | null;
          blocked?: boolean | null;
          branch_id?: string | null;
          business_name?: string | null;
          created_at?: string | null;
          customer_type?: Database['public']['Enums']['customer_type'] | null;
          email?: string | null;
          first_name?: string | null;
          id?: string | null;
          independent_sales_id?: string | null;
          last_name?: string | null;
          opted_in_text?: boolean | null;
          phone?: string | null;
          tax_id?: string | null;
          tobacco_license?: string | null;
          updated_at?: string | null;
        };
        Update: {
          approved?: boolean | null;
          approved_at?: string | null;
          belongs_to?: Database['public']['Enums']['customer_belongs_to'] | null;
          blocked?: boolean | null;
          branch_id?: string | null;
          business_name?: string | null;
          created_at?: string | null;
          customer_type?: Database['public']['Enums']['customer_type'] | null;
          email?: string | null;
          first_name?: string | null;
          id?: string | null;
          independent_sales_id?: string | null;
          last_name?: string | null;
          opted_in_text?: boolean | null;
          phone?: string | null;
          tax_id?: string | null;
          tobacco_license?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'customers_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_independent_sales_id_fkey';
            columns: ['independent_sales_id'];
            isOneToOne: false;
            referencedRelation: 'admin_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_independent_sales_id_fkey';
            columns: ['independent_sales_id'];
            isOneToOne: false;
            referencedRelation: 'independent_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_independent_sales_id_fkey';
            columns: ['independent_sales_id'];
            isOneToOne: false;
            referencedRelation: 'inhouse_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'customers_independent_sales_id_fkey';
            columns: ['independent_sales_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      website_only_branch_analytics: {
        Row: {
          branch_id: string | null;
          order_date: string | null;
          revenue: number | null;
          total_products_sold: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'orders_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
        ];
      };
      wholesale_salesperson_branch_analytics: {
        Row: {
          branch_id: string | null;
          order_date: string | null;
          revenue: number | null;
          salesperson_id: string | null;
          total_products_sold: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'orders_branch_id_fkey';
            columns: ['branch_id'];
            isOneToOne: false;
            referencedRelation: 'branches';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'admin_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'independent_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'inhouse_sales_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_salesperson_id_fkey';
            columns: ['salesperson_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Functions: {
      adjust_order_items_quantities:
        | {
            Args: {
              items: Json[];
            };
            Returns: {
              created_at: string;
              discount_amount: number;
              discount_per_unit: number;
              id: string;
              order_id: string;
              original_quantity: number;
              original_total: number;
              product_id: string;
              quantity: number;
              refunded_amount: number;
              refunded_quantity: number;
              status: Database['public']['Enums']['order_item_status'];
              tax_amount: number;
              tax_per_unit: number;
              total_price: number;
              unit_price: number;
              updated_at: string;
            }[];
          }
        | {
            Args: {
              items: Json[];
              user_id: string;
            };
            Returns: {
              created_at: string;
              discount_amount: number;
              discount_per_unit: number;
              id: string;
              order_id: string;
              original_quantity: number;
              original_total: number;
              product_id: string;
              quantity: number;
              refunded_amount: number;
              refunded_quantity: number;
              status: Database['public']['Enums']['order_item_status'];
              tax_amount: number;
              tax_per_unit: number;
              total_price: number;
              unit_price: number;
              updated_at: string;
            }[];
          };
      create_order_from_cart: {
        Args: {
          p_cart_id: string;
          p_order_type: string;
          p_instructions?: string;
        };
        Returns: Json;
      };
      create_salesperson_order: {
        Args: {
          p_cart_id: string;
          p_order_type: Database['public']['Enums']['order_type'];
          p_instructions?: string;
          p_later_payment_method?: string;
          p_order_category?: Database['public']['Enums']['order_category'];
        };
        Returns: Json;
      };
      get_order_by_id: {
        Args: {
          p_order_id: string;
        };
        Returns: {
          branch_id: string;
          cancelled_at: string | null;
          completed_at: string | null;
          confirmed_at: string | null;
          created_at: string;
          customer_id: string;
          delivery_address_id: string | null;
          delivery_fee: number;
          expected_delivery_at: string | null;
          fees: number;
          id: string;
          instructions: string | null;
          order_category: Database['public']['Enums']['order_category'];
          order_number: string;
          original_order_number: string | null;
          preparing_at: string | null;
          quantity_refunded: number;
          ready_at: string | null;
          refunded_at: string | null;
          salesperson_customer_id: string | null;
          salesperson_id: string | null;
          shipping_costs: number | null;
          status: Database['public']['Enums']['order_status'];
          subtotal: number | null;
          tax: number;
          total_amount: number;
          total_before_calculations: number;
          total_discount: number;
          total_quantity: number;
          total_refunded: number;
          type: Database['public']['Enums']['order_type'];
          updated_at: string;
        };
      };
      get_user_branch: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      is_independent_sales: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      is_sales: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      is_wholesale_sales: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      update_order_items_refund_quantities:
        | {
            Args: {
              items: Json[];
            };
            Returns: {
              created_at: string;
              discount_amount: number;
              discount_per_unit: number;
              id: string;
              order_id: string;
              original_quantity: number;
              original_total: number;
              product_id: string;
              quantity: number;
              refunded_amount: number;
              refunded_quantity: number;
              status: Database['public']['Enums']['order_item_status'];
              tax_amount: number;
              tax_per_unit: number;
              total_price: number;
              unit_price: number;
              updated_at: string;
            }[];
          }
        | {
            Args: {
              items: Json[];
              user_id: string;
            };
            Returns: {
              created_at: string;
              discount_amount: number;
              discount_per_unit: number;
              id: string;
              order_id: string;
              original_quantity: number;
              original_total: number;
              product_id: string;
              quantity: number;
              refunded_amount: number;
              refunded_quantity: number;
              status: Database['public']['Enums']['order_item_status'];
              tax_amount: number;
              tax_per_unit: number;
              total_price: number;
              unit_price: number;
              updated_at: string;
            }[];
          };
      update_order_status: {
        Args: {
          p_order_id: string;
          p_status: Database['public']['Enums']['order_status'];
        };
        Returns: {
          branch_id: string;
          cancelled_at: string | null;
          completed_at: string | null;
          confirmed_at: string | null;
          created_at: string;
          customer_id: string;
          delivery_address_id: string | null;
          delivery_fee: number;
          expected_delivery_at: string | null;
          fees: number;
          id: string;
          instructions: string | null;
          order_category: Database['public']['Enums']['order_category'];
          order_number: string;
          original_order_number: string | null;
          preparing_at: string | null;
          quantity_refunded: number;
          ready_at: string | null;
          refunded_at: string | null;
          salesperson_customer_id: string | null;
          salesperson_id: string | null;
          shipping_costs: number | null;
          status: Database['public']['Enums']['order_status'];
          subtotal: number | null;
          tax: number;
          total_amount: number;
          total_before_calculations: number;
          total_discount: number;
          total_quantity: number;
          total_refunded: number;
          type: Database['public']['Enums']['order_type'];
          updated_at: string;
        };
      };
    };
    Enums: {
      acknowledgement_status: 'pending' | 'seen';
      address_type: 'billing' | 'delivery';
      app_type: 'sales' | 'customers' | 'orders';
      branch_status: 'open' | 'busy' | 'closed';
      card_provider: 'visa' | 'amex' | 'master' | 'discover' | 'unknown';
      customer_belongs_to: 'wholesale' | 'independent';
      customer_type: 'wholesale' | 'retail';
      delivery_fee_type: 'fixed' | 'percentage';
      order_category: 'regular' | 'return';
      order_item_status: 'confirmed' | 'returned' | 'partial';
      order_status:
        | 'created'
        | 'pending'
        | 'confirmed'
        | 'preparing'
        | 'ready'
        | 'completed'
        | 'cancelled'
        | 'refunded';
      order_type: 'delivery' | 'pickup' | 'shipment';
      pay_later_methods: 'cash' | 'check' | 'card';
      payment_status: 'pending' | 'approved' | 'declined' | 'voided';
      payment_type: 'cash' | 'check' | 'later' | 'card' | 'online';
      user_role: 'admin' | 'driver' | 'sales' | 'independent_sales';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;
