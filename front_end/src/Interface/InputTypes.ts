export interface UserFormDataType {
    _id?:string;
    name: string;
    mobile: string;
    email: string;
    image: File | null;
    password: string;
    is_block?:boolean
}




export interface ModalProps {
    show: boolean;
    onClose: () => void;
    onConform?: () => void;
    title: string;
    body: string;
}


export interface EditModelProps extends ModalProps {
    data: any
    onConform?: (formData?: { name: string; email: string; mobile: string, is_block?: boolean }) => void;
}


