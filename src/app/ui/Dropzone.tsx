"use client";

import { useEffect, useRef } from "react";
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";

const DropzoneComponent = ({ onFileUpload }) => {
  const dropzoneRef = useRef(null);

  useEffect(() => {
    if (!onFileUpload) {
      console.error("onFileUpload is not provided to DropzoneComponent");
      return;
    }

    Dropzone.autoDiscover = false;

    const myDropzone = new Dropzone(dropzoneRef.current, {
      url: "/api/uploadProduct",
      addRemoveLinks: true,
      dictDefaultMessage: "ลากและวางไฟล์ที่นี่ หรือคลิกเพื่ออัปโหลด",
       params: function (files, xhr, chunk) {
        return {
          name: `file_${Date.now()}`, // ใช้ timestamp เป็นค่า name
          dzuuid: chunk ? chunk.file.upload.uuid : undefined, // ถ้ามีการอัปโหลดแบบ chunk, ให้แนบ UUID
        };
      },
    });

    myDropzone.on("success", function (file, response) {
      if (response.name) {
        onFileUpload((prevFiles) => [...prevFiles, response.name]); // ส่งข้อมูลกลับไปที่ FormPage
      }
    });

    return () => {
      myDropzone.destroy();
    };
  }, [onFileUpload]);

  return (
    <div className="p-4">
      <div
        ref={dropzoneRef}
        className="dropzone border-2 border-dashed p-6 rounded-lg"
      >
        {/* พื้นที่ Dropzone */}
      </div>
    </div>
  );
};

export default DropzoneComponent;



// import { useEffect } from "react";
// import Dropzone from "dropzone";
// import "dropzone/dist/dropzone.css";

// const uploadedFiles = [];

// const DropzoneComponent = () => { 
//   useEffect(() => {
//     Dropzone.autoDiscover = false;

//     const myDropzone = new Dropzone("#img", {
//       url: "/api/uploadProduct",
//       addRemoveLinks: true,
//       dictDefaultMessage: "ลากและวางไฟล์ที่นี่ หรือคลิกเพื่ออัปโหลด",
//       params: function (files, xhr, chunk) {
//         return {
//           name: `file_${Date.now()}`, // ใช้ timestamp เป็นค่า name
//           dzuuid: chunk ? chunk.file.upload.uuid : undefined, // ถ้ามีการอัปโหลดแบบ chunk, ให้แนบ UUID
//         };
//       },
//     });

//     myDropzone.on("success", function (file, response) {
//       if (response.name) {
//         uploadedFiles.push(response.name); // เพิ่มชื่อไฟล์ที่ได้รับจาก response
//         updateProductImgValue();
//       }
//     });
//     myDropzone.on("addedfile", (file) => {
//       //document.getElementById("product_img").value = file.name;
//       //console.log(`File added with new name: ${file.name}`);
//     });

//     myDropzone.on("removedfile", (file) => {
//       //console.log(`File removed: ${file.name}`);
//       // คุณสามารถเพิ่มโค้ดสำหรับเรียก API เพื่อลบไฟล์จากเซิร์ฟเวอร์ที่นี่
//     });
    

//     return () => {
//       myDropzone.destroy();
//     };
//   }, []);
//   // ฟังก์ชันอัปเดตค่า input ให้แสดงชื่อไฟล์ทั้งหมด
//   function updateProductImgValue() {
//     document.getElementById("product_img").value = uploadedFiles.join(", ");
//   }

//   return (
//     <div className="p-4">
//       <div id="img" className="dropzone border-2 border-dashed p-6 rounded-lg ">
//         {/* พื้นที่ Dropzone */}
//       </div>
//       <input type="hidden" name="product_img" id="product_img" />
//     </div>
//   );
// };

// export default DropzoneComponent;

// import { useCallback } from "react";
// import { useDropzone } from "react-dropzone";

// export default function FileUpload() {
//   const onDrop = useCallback(async (acceptedFiles: File[]) => {
//     const formData = new FormData();
//     acceptedFiles.forEach((file) => {
//       formData.append("file", file);
//     });

//     const response = await fetch("/api/uploadProduct", {
//       method: "POST",
//       body: formData,
//     });

//     const result = await response.json();
//     console.log(result);
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: { "image/*": [] }, // รองรับเฉพาะไฟล์ภาพ
//     multiple: true, // อนุญาตให้อัปโหลดหลายไฟล์
//   });

//   return (
//     <div
//       {...getRootProps()}
//       className="h-full border-2 border-dashed border-gray-400 p-6 text-center rounded-lg cursor-pointer "
//     >
//       <input {...getInputProps()} />
//       {isDragActive ? (
//         <p>วางไฟล์ที่นี่...</p>
//       ) : (
//         <p >ลากและวางไฟล์ที่นี่ หรือคลิกเพื่ออัปโหลด</p>
//       )}
//     </div>
//   );
// }

// import { useEffect, useRef } from "react";
// import Dropzone from "dropzone";

// const MyDropzone = () => {
//   const dropzoneRef = useRef(null);

//   useEffect(() => {
//     if (dropzoneRef.current) {
//       const dz = new Dropzone(dropzoneRef.current, {
//         url: "/api/uploadProduct", // API route
//         paramName: "file", // ต้องตรงกับ API
//         maxFiles: 5, // กำหนดจำนวนไฟล์สูงสุด
//         uploadMultiple: true, // เปิดใช้งานอัปโหลดหลายไฟล์
//         parallelUploads: 5, // จำนวนไฟล์ที่อัปโหลดพร้อมกัน
//         autoProcessQueue: true,
//         acceptedFiles: "image/*",
//       });

//       return () => dz.destroy(); // Cleanup Dropzone instance
//     }
//   }, []);

//   return (
//     <div ref={dropzoneRef} className="dropzone border-2 border-dashed p-10">
//       <p>ลากและวางไฟล์ที่นี่ หรือคลิกเพื่ออัปโหลด</p>
//     </div>
//   );
// };

//export default MyDropzone;
