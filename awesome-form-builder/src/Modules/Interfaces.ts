export interface FormObject {
  type?: string;
  name?: string;
  label?: string;
  required?: boolean;
  config?: {
    options: ConfigOptions[];
  }
}

export interface formData {
  createdAt?: string,
  form?: FormObject[],
  updatedAt?: string,
  __v?: number;
  _id?: string;
}

export interface FormMainObj {
  form: FormObject[],
  id?: string
}

export interface ConfigOptions {
  label?: string;
  value?: string;
  _id?: string;
}


