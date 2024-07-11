// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Container from '@/components/Container';
// import { createOrder } from '@/services/order.service';


// import api from '@/api/apiApp';


// interface Product {
//   id: number;
//   admin_id: number;
//   name: string;
//   description: string;
//   price: number;
//   category_id: number
//   image: string

// }
// export default function CreateOrder() {
//   const [products, setProducts] = useState<Product[]>([]);


//   const getListProduct = async () => {
//     try {
//       const result = await api.get("/api/product");
//       setProducts(result.data.data.products);
//       console.log(result);
//     } catch (error) {
//       console.error("Failed to fetch Product:", error);
//     }
//   };

//   useEffect(() => {
//     getListProduct();
//   }, []);


//   const [formData, setFormData] = useState({
//     user_id: '',
//     store_id: '',
//     voucher_id: '',
//     status: '',
//     totalAmount: ''
    
//   });

//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);

//   type ChangeEvent =
//     | React.ChangeEvent<HTMLInputElement>
//     | React.ChangeEvent<HTMLTextAreaElement>
//     | React.ChangeEvent<HTMLSelectElement>;

//   const handleChange = (e: ChangeEvent) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     setIsLoading(true);
//     e.preventDefault();

//     try {
//         const formDataWithAdminIdAsNumber = {
//           ...formData,
          
//           user_id: parseInt(formData.user_id, 10),
//           store_id: parseInt(formData.store_id, 10),
//           voucher_id: parseInt(formData.voucher_id,10),
//           totalAmount: parseFloat(formData.totalAmount) || null
//         };
//       const order = await createOrder (formDataWithAdminIdAsNumber);
//       // const store = await createStore(formData);
//       if (!order) throw new Error('Create order failed!');
//       alert('Create order success');
//       router.push('/admin/order');
//     } catch (err) {
//       console.error(err);
//       alert('Create order failed');
//     }
//   };
//   return (
//     <>
//       <Container>
//         <div className="min-h-screen flex items-center justify-center">
//           <div className="max-w-md w-full p-8 rounded-lg shadow-lg">
//             <h2 className="text-2xl font-bold mb-6 text-center">
//               LIST ORDER
//             </h2>
//             <form onSubmit={handleSubmit}>
//               {/* <div className="mb-4">
//                 <label htmlFor="admin_id" className="block">
//                   Admin ID
//                 </label>
//                 <input
//                   type="number"
//                   id="admin_id"
//                   name="admin_id"
//                   className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
//                   value={formData.admin_id}
//                   onChange={handleChange}
//                   required
//                 />
//               </div> */}
//               {/* <div className="mb-4">
//                 <label htmlFor="store_id" className="block">
//                   Store
//                 </label>
//                 <input
//                   type="text"
//                   id="store_id"
//                   name="store_id"
//                   className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
//                   value={formData.store_id}
//                   onChange={handleChange}
//                   required
//                 />
//               </div> */}
//               <div className="mb-4">
//                 <label htmlFor="user_id" className="block">
//                   User
//                 </label>
//                 <select
//                   id="user_id"
//                   name="user_id"
//                   className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
//                   value={formData.user_id}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">Pilih Product</option>
//                   {products.map((product) => (
//                     <option key={product.id} value={product.id}>
//                       {product.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="mb-4">
//                 <label htmlFor="store_id" className="block">
//                   Store
//                 </label>
//                 <input
//                   type="text"
//                   id="store_id"
//                   name="store_id"
//                   className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
//                   value={formData.store_id}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="voucher_id" className="block">
//                   Voucher
//                 </label>
//                 <input
//                   type="text"
//                   id="voucher_id"
//                   name="voucher_id"
//                   className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
//                   value={formData.voucher_id}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="mb-4">
//                 <label htmlFor="status" className="block">
//                   Status
//                 </label>
//                 <input
//                   type="text"
//                   id="status"
//                   name="status"
//                   className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
//                   value={formData.status}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="mb-4">
//                 <label htmlFor="totalAmount" className="block">
//                   Total Amount
//                 </label>
//                 <input
//                   type="text"
//                   id="totalAmount"
//                   name="totalAmount"
//                   className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-accent focus:border-accent sm:text-sm"
//                   value={formData.totalAmount}
//                   onChange={handleChange}
//                 />
//               </div>
             

//               <div className="mb-4">
//                 <button
//                   type="submit"
//                   className="w-full bg-[#0a6406] text-white py-2 rounded-md hover:bg-[#739802] transition duration-200"
//                 >
//                   {isLoading ? 'Loading...' : 'Create Stock'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </Container>
//     </>
//   );
// }