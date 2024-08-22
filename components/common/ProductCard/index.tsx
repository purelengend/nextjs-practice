"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardBody,
  CardHeader,
  Image as NextUIImage,
  useDisclosure,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Types
import { Product, ToastType } from "@/types";

// Components
import { Button } from "../Button";
import {
  CartIcon,
  DeleteIcon,
  DownloadIcon,
  EditIcon,
  EyeIcon,
  FavoriteIcon,
  NextArrowIcon,
  SolidStarIcon,
} from "../Icons";

// Services
import { markProduct } from "@/lib";

// Constants
import { MARK_FAVORITE_MESSAGES, PRODUCT_MESSAGES } from "@/constants";

// Models
import { PLACEHOLDER_COURSE_IMAGE } from "@/mocks";

// Components
import { ConfirmProductForm } from "@/components";

const ProductCard = (props: Product) => {
  const {
    category,
    coverImageUrl,
    description,
    rate,
    originalPrice,
    salePrice,
    title,
    sales,
    isFavorited,
    id,
  } = props;

  const [isPending, setIsPending] = useState(false);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure({
    defaultOpen: false,
  });

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const toastType = searchParams.get("toastType") ?? ToastType.SUCCESS;
  const message = searchParams.get("message") ?? "";
  const productId = searchParams.get("id") ?? "";

  const handleMarkFavorite = async (data: Product) => {
    try {
      setIsPending(true);
      const response = await markProduct(data);
      toast.success(
        response.isFavorited
          ? MARK_FAVORITE_MESSAGES.SUCCESS.MARKED
          : MARK_FAVORITE_MESSAGES.SUCCESS.UNMARKED,
      );
    } catch (error) {
      toast.error(
        props.isFavorited
          ? MARK_FAVORITE_MESSAGES.ERROR.UNMARKED
          : MARK_FAVORITE_MESSAGES.ERROR.MARKED,
      );
    } finally {
      setIsPending(false);
    }
  };

  // useEffect(() => {
  //   if (
  //     toastType === ToastType.SUCCESS &&
  //     message === PRODUCT_MESSAGES.SUCCESS.DELETE &&
  //     productId === id
  //   ) {
  //     onClose();
  //     toast.success(message);

  //     const params = new URLSearchParams(searchParams.toString());

  //     params.delete("toastType");
  //     params.delete("message");
  //     params.delete("id");

  //     router.push(`${pathname}?${params.toString()}`, { scroll: false });
  //   }

  //   if (
  //     toastType === ToastType.ERROR &&
  //     message === PRODUCT_MESSAGES.ERROR.DELETE &&
  //     productId === id
  //   ) {
  //     onClose();
  //     toast.error(message);

  //     const params = new URLSearchParams(searchParams.toString());

  //     params.delete("toastType");
  //     params.delete("message");
  //     params.delete("id");

  //     router.push(`${pathname}?${params.toString()}`, { scroll: false });
  //   }
  // }, [
  //   message,
  //   pathname,
  //   router,
  //   searchParams,
  //   toastType,
  //   id,
  //   productId,
  //   onClose,
  // ]);

  return (
    <>
      <Card
        className="max-w-82 flex flex-col rounded-none"
        isDisabled={isPending}
      >
        <CardHeader className="relative p-0">
          <NextUIImage
            as={Image}
            src={coverImageUrl || PLACEHOLDER_COURSE_IMAGE}
            alt={`An image about ${title}`}
            width={328}
            height={300}
            className="max-w-full max-h-75"
            isZoomed
            radius="none"
          />

          <div className="px-2.5 bg-danger absolute rounded-0.75 top-5 left-5 z-10">
            <p className="text-white text-sm/6 font-bold">Sale</p>
          </div>
          <div className="flex gap-2.5 absolute bottom-6 left-24 z-10">
            <Button
              className={`${!!isFavorited ? "bg-red-500 text-white" : "bg-white text-black"}`}
              variant="action"
              size="tiny"
              aria-label="favorite button"
              isIconOnly
              onClick={() => handleMarkFavorite(props)}
            >
              <FavoriteIcon />
            </Button>
            <Button
              className="bg-white"
              variant="action"
              size="tiny"
              aria-label="cart button"
              isIconOnly
            >
              <EditIcon />
            </Button>
            <Button
              className="bg-white"
              variant="action"
              size="tiny"
              aria-label="watch later button"
              isIconOnly
              onPress={onOpen}
            >
              <DeleteIcon />
            </Button>
          </div>
        </CardHeader>
        <CardBody className="light px-6.25 pt-6.25 pb-8.75 bg-white flex flex-col gap-2.5">
          <div className="flex justify-between">
            <span className="text-primary text-sm/6 font-bold">{category}</span>
            <div className="p-1.25 flex items-center gap-1.25 bg-dark-blue rounded-[20px]">
              <SolidStarIcon />
              <span className="text-white text-xs">{rate}</span>
            </div>
          </div>
          <p className="text-foreground text-base font-bold line-clamp-1">
            {title}
          </p>
          <p className="text-foreground-100 text-sm line-clamp-2">
            {description}
          </p>
          <div className="flex items-center gap-2.5 text-foreground-100 text-sm/6 font-bold">
            <DownloadIcon />
            {sales} Sales
          </div>
          <div className="py-1.25 px-0.75 flex gap-1.25">
            <span className="text-foreground-50 text-base font-bold">
              ${originalPrice}
            </span>
            <span className="text-secondary text-base font-bold">
              ${salePrice}
            </span>
          </div>
          <div className="mt-auto">
            <Button
              color="primary"
              variant="bordered"
              size="xs"
              className="font-bold"
              as={Link}
              href="#"
              aria-label="Go to learn more page"
              endContent={<NextArrowIcon />}
            >
              Learn More
            </Button>
          </div>
        </CardBody>
      </Card>

      <ConfirmProductForm
        id={id}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </>
  );
};

export default ProductCard;
