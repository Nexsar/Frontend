import { Button as ButtonShad } from "../components/ui/Button";
import React from "react";
import { Boxes } from "../components/ui/background-boxes";
import { cn } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import { CardSpotlight } from "../components/ui/card-spotlight";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  FormLabel,
  FormControl,
  Input,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { setType } from "../slices/userSlice";

const InteractiveHome = () => {
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const [name, setName] = useState("Somyajeet");
  const [personality, setPersonality] = useState("Student");
  const [frequency, setFrequency] = useState(100);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const user = useSelector((state) => state.user);
  console.log({ user });

  useEffect(() => {
    if (!user.is_lit_authenticated) {
      navigate("/lit");
    }
  }, []);

  const handleDistributor = () => {
    //TODO: open a pop up-> take his details -> create a distributor first and then route
    dispatch(setType("distributor"));
    onOpen();

    //todo: call the contract with name, address,etc..
    // navigate("/distributor");
  };

  const handleWorker = () => {
    //TODO: create a worker first
    dispatch(setType("worker"));
    onOpen();
    //todo: call the contract with name, address,etc..
    //navigate("/worker");
  };

  return (
    <>
      <div className="h-screen relative w-full overflow-hidden bg-black flex flex-col items-center justify-center rounded-lg">
        <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        <Boxes />
        <div className="z-20 flex my-3 mx-2 gap-2">
          <CardSpotlight className="flex flex-col justify-center items-center gap-3">
            <h1 className="text-white">What do you want to register as? </h1>
            <div className="flex gap-3">
              <ButtonShad
                onClick={handleDistributor}
                className="h-[50px] w-[100px] bg-violet-700 z-50 cursor-pointer"
              >
                Distributor
              </ButtonShad>
              <ButtonShad
                onClick={handleWorker}
                className="h-[50px] w-[100px] bg-green-400 z-50 cursor-pointer"
              >
                Worker
              </ButtonShad>
            </div>
          </CardSpotlight>
        </div>
      </div>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                ref={initialRef}
                value={name}
                placeholder="Give yourself a cool name"
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            {user.type === "distributor" && (
              <FormControl mt={4}>
                <FormLabel>Personality</FormLabel>
                <Input
                  placeholder="Describe your character"
                  value={personality}
                  onChange={(e) => setPersonality(e.target.value)}
                />
              </FormControl>
            )}
            {user.type === "distributor" && (
              <FormControl mt={4}>
                <FormLabel>Frequency</FormLabel>
                <Input
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  placeholder="In how much intervals do you want to post?"
                />
              </FormControl>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InteractiveHome;
