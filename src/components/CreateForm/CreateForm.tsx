import { useState, type FormEvent } from "react";
import styles from "./CreateForm.module.css";
import type {
  ICreateForm,
  TCreateForm,
  TCreateFormErrors,
} from "./CreateFormTypes";
import { useShapeStore } from "@/store";
import { ShapeFactory } from "@/factories";
export const CreateForm = ({ onClose }: TCreateForm) => {
  const [formData, setFormData] = useState<ICreateForm>({
    shapeType: "circle",
    color: "#000000",
    size: 10,
  });
  const [errors, setErrors] = useState<TCreateFormErrors>({});
  const { addShape } = useShapeStore();

  const validateForm = (data: ICreateForm): TCreateFormErrors => {
    const newErrors: TCreateFormErrors = {};
    if (!data.shapeType) {
      newErrors.shapeType = "Выберите тип фигуры";
    }
    if (!data.color) {
      newErrors.color = "Выберите цвет";
    }
    if (!data.size || data.size <= 14) {
      newErrors.size = "Размер фигуры должен быть больше 14";
    }
    return newErrors;
  };

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return null;
    const newShape = ShapeFactory.createShape(formData.shapeType, {
      ...formData,
    });
    addShape(newShape);
    onClose();
  };

  const handleInputChange = (
    field: keyof ICreateForm,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <form className={styles.form_container} onSubmit={handleSubmitForm}>
      <div>
        <select
          name="shapes"
          style={{ fontSize: "16px", width: "100%", padding: "5px" }}
          value={formData.shapeType}
          onChange={(e) => handleInputChange("shapeType", e.target.value)}
        >
          <option value={""}>Выберите фигуру</option>
          <option value={"circle"}>Круг</option>
          <option value={"square"}>Квадрат</option>
        </select>
        <p className={styles.error_text} style={{ opacity: 0 }}>
          {errors.shapeType}
        </p>
      </div>
      <div className={styles.field_container}>
        <label htmlFor="color" className={styles.label_text}>
          Выберите цвет фигуры
        </label>
        <input
          name="color"
          type="color"
          value={formData.color}
          onChange={(e) => handleInputChange("color", e.target.value)}
        />
        <p className={styles.error_text} style={{ opacity: 0 }}>
          {errors.color}
        </p>
      </div>
      <div>
        <input
          name="size"
          type="number"
          style={{ fontSize: "16px", width: "100%" }}
          value={formData.size}
          onChange={(e) => handleInputChange("size", e.target.value)}
        />
        <p className={styles.error_text} style={{ opacity: 0 }}>
          {errors.size}
        </p>
      </div>
      <button className={styles.submit_btn} type="submit">
        Создать фигуру
      </button>
    </form>
  );
};
