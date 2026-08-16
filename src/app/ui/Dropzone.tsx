
"use client";

import { useEffect, useRef } from "react";
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";

type DropzoneFile = File & {
  serverFileName?: string;
  isExisting?: boolean;
};

type DropzoneProps = {
  onFileUpload: (
    updater:
      | string
      | string[]
      | ((prev: string[]) => string[])
  ) => void;
  existingImages?: string[];
};

const DropzoneComponent = ({
  onFileUpload,
  existingImages = [],
}: DropzoneProps) => {
  const dropzoneRef = useRef<HTMLDivElement | null>(null);
  const dzRef = useRef<Dropzone | null>(null);

  // ป้องกัน removedfile ทำงานตอน destroy
  const isDestroyingRef = useRef(false);

  // เก็บรูปที่แสดงใน Dropzone แล้ว
  const displayedImagesRef = useRef<Set<string>>(new Set());

  /**
   * สร้าง Dropzone
   */
  useEffect(() => {
    if (!onFileUpload) return;
    if (!dropzoneRef.current) return;
    if (dzRef.current) return;

    Dropzone.autoDiscover = false;

    console.log("Dropzone INIT");

    const dz = new Dropzone(dropzoneRef.current, {
      url: "/api/uploadProduct",

      paramName: "file",

      addRemoveLinks: true,

      acceptedFiles: "image/*",

      dictDefaultMessage:
        "ลากและวางไฟล์ที่นี่ หรือคลิกเพื่ออัปโหลด",

      params: function (files, xhr, chunk) {
        return {
          name: `file_${Date.now()}`,
          dzuuid: chunk
            ? chunk.file.upload.uuid
            : undefined,
        };
      },
    });

    dzRef.current = dz;

    /**
     * ================================
     * Upload สำเร็จ
     * ================================
     */
    dz.on("success", (file, response) => {
      console.log("UPLOAD SUCCESS");
      console.log("response:", response);

      if (!response?.name) {
        console.warn("ไม่มี response.name");
        return;
      }

      const dropzoneFile = file as DropzoneFile;

      dropzoneFile.serverFileName = response.name;
      dropzoneFile.isExisting = false;

      onFileUpload((prev) => {
        console.log("ADD BEFORE:", prev);
        console.log("ADD FILE:", response.name);

        // ป้องกันไฟล์ซ้ำ
        if (prev.includes(response.name)) {
          console.log("ไฟล์มีอยู่แล้ว");

          return prev;
        }

        const next = [
          ...prev,
          response.name,
        ];

        console.log("ADD AFTER:", next);

        return next;
      });
    });

    /**
     * ================================
     * ลบไฟล์ด้วยปุ่ม Remove
     * ================================
     */
    // dzRef.current.on("removedfile", (file) => {
    //   onFileUpload((prev) =>
    //     prev.filter((name) => name !== file.name)
    //   );
    // });
    dz.on("removedfile", (file) => {
      if (isDestroyingRef.current) {
        console.log(
          "IGNORE removedfile because Dropzone is destroying"
        );
        return;
      }

      const dropzoneFile = file as DropzoneFile;

      const filename =
        dropzoneFile.serverFileName ||
        dropzoneFile.name;

      console.log("USER REMOVE:", filename);

      onFileUpload((prev) => {
        console.log("BEFORE REMOVE:", prev);

        const next = prev.filter(
          (img) => img !== filename
        );

        console.log("AFTER REMOVE:", next);

        return next;
      });

    });

    /**
     * ================================
     * Cleanup
     * ================================
     */
    return () => {
      console.log("Dropzone DESTROY");

      // สำคัญ: ตั้ง flag ก่อน destroy
      isDestroyingRef.current = true;

      dz.destroy();

      dzRef.current = null;
    };
  }, [onFileUpload]);

  /**
   * ================================
   * แสดงรูปเดิม
   * ================================
   */
  const existingImagesLoadedRef = useRef(false);
  useEffect(() => {
    if (!dzRef.current) return;
    if (!Array.isArray(existingImages)) return;
    if (!existingImages.length) return;
    if (existingImagesLoadedRef.current) return;

    existingImagesLoadedRef.current = true;

    existingImages.forEach((image) => {
      const mockFile = {
        name: image,
        size: 12345,
        accepted: true,
        serverFileName: image,
      };

      dzRef.current.displayExistingFile(
        mockFile,
        `/uploads/product/${image}`
      );
    });
  }, [existingImages]);

  /**
   * ================================
   * Reset เมื่อ component unmount
   * ================================
   */
  useEffect(() => {
    return () => {
      displayedImagesRef.current.clear();
    };
  }, []);

  return (
    <div
      ref={dropzoneRef}
      className="dropzone min-h-[200px] border-2 border-dashed border-gray-300 rounded-lg p-6"
    />
  );
};

export default DropzoneComponent;

