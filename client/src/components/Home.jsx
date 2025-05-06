import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Filter from "./Filter";
import Resource from "./Resource";
import ContributeModal from "./ContributeModal";
import {
  setResources,
  setResourcesLoading,
  setResourcesError,
} from "../store/resourceSlice";

const Home = () => {
  const dispatch = useDispatch();
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchResources = async () => {
      dispatch(setResourcesLoading());
      try {
        // NOTE: The endpoint '/create' seems unusual for a GET request to fetch resources.
        // Typically, it might be just '/resources' or similar. Please verify the endpoint.
        const response = await fetch(
          "http://localhost:3000/api/v1/resources/create"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        dispatch(setResources(data)); // Assuming the API returns an array of resources
      } catch (error) {
        console.error("Failed to fetch resources:", error);
        dispatch(setResourcesError(error.message));
      }
    };

    fetchResources();
  }, [dispatch]); // Dependency array includes dispatch

  return (
    <section>
      <Filter
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />
      <Resource
        selectedFilter={selectedFilter}
        openContributeModal={() => setIsModalOpen(true)}
      />
      <ContributeModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default Home;
