/**
  Fill data with carts
 */
INSERT INTO public.carts (created_at, updated_at) values
('2022-11-19', '2022-11-19'),
('2022-11-20', '2022-11-20')

/**
  Fill data with cart_items
 */
INSERT INTO public.cart_items (cart_id, product_id, count) values
('545ff7dd-211c-4130-974f-d8a7305e76e7', 'cb829089-e5fe-4c75-8cb0-d2039e27cba7', 1),
('5138684b-8ff9-42f3-83ca-f88922bf36de', '5b625b80-61a7-4f4f-8c6e-4f623a049aa1', 2)

/**
  Fill data with users
 */
INSERT INTO public.users (name, email, password) values
    ('xlegoleg', 'xxxlegoleg@gmail.com', 'TEST_PASSWORD'),
    ('test', 'test@example.com', 'test');